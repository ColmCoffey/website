import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from './ui/card';
import { Loader2, Copy, RefreshCw, History, AlertCircle, CheckCircle } from 'lucide-react';
import { RAGInterfaceProps, RAGResponse, QueryHistoryItem } from '../types/project';

interface StatusMessageProps {
  status: 'loading' | 'success' | 'error' | null;
  message: string;
}

const StatusMessage = ({ status, message }: StatusMessageProps) => {
  const icons = {
    loading: <Loader2 className="h-5 w-5 animate-spin text-blue-500" />,
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
  };

  const statusClasses = {
    loading: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  return status ? (
    <div className={`flex items-center p-4 border rounded-md ${statusClasses[status]}`}>
      <div className="mr-3">{icons[status]}</div>
      <span>{message}</span>
    </div>
  ) : null;
};

const DEFAULT_SAMPLE_QUERIES: Record<string, string[]> = {
  cervicalDystonia: [
    "What are the main symptoms of cervical dystonia?",
    "What is the role of botulinum toxin in treating cervical dystonia?",
    "How does deep brain stimulation help with cervical dystonia?",
    "What are the latest treatment developments for cervical dystonia?",
  ],
  parkinsons: [
    "What are the main symptoms of PD?",
    "What is the role of levodopa and carbidopa in treating Parkinsons?",
    "Does deep brain stimulation help with Parkinson's Disease?",
    "What are the latest treatment developments for PD?",
  ]
};

const RAGInterface = ({ 
  apiEndpoint,
  topic = 'cervicalDystonia',
  customSampleQueries,
  placeholder = "Ask a question..."
}: RAGInterfaceProps) => {
  const [query, setQuery] = useState<string>('');
  const [workingNotes, setWorkingNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<RAGResponse | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([]);

  // Load query history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(`queryHistory-${topic}`);
    if (savedHistory) {
      setQueryHistory(JSON.parse(savedHistory));
    }
  }, [topic]);

  // Save query history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`queryHistory-${topic}`, JSON.stringify(queryHistory));
  }, [queryHistory, topic]);

  const ENDPOINTS = {
    submit: `${apiEndpoint}/submit_query`,
    getResult: (id: string) => `${apiEndpoint}/get_query?query_id=${id}`
  };

  const sampleQueries = customSampleQueries || DEFAULT_SAMPLE_QUERIES[topic] || [];

  const checkResult = useCallback(async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(ENDPOINTS.getResult(id));
      if (!response.ok) throw new Error('Failed to fetch results');

      const data: RAGResponse = await response.json();
      
      if (data.is_complete) {
        setResult(data);
        setIsLoading(false);
        setStatus('success');
        setStatusMessage('Query processed successfully');
        setWorkingNotes('Final results retrieved and displayed below.');
        return true;
      }
      
      setWorkingNotes(`Still processing... analyzing ${topic} literature.`);
      return false;
    } catch (err) {
      const error = err as Error;
      setStatus('error');
      setStatusMessage('Error checking results: ' + error.message);
      setIsLoading(false);
      setWorkingNotes('Error occurred while retrieving results.');
      return true;
    }
  }, [ENDPOINTS, topic]);

  const startPolling = useCallback(async (id: string) => {
    let attempts = 0;
    const maxAttempts = 30;
    let pollInterval: NodeJS.Timeout;
    
    const cleanup = () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };

    pollInterval = setInterval(async () => {
      attempts++;
      
      if (attempts > maxAttempts) {
        cleanup();
        setStatus('error');
        setStatusMessage('Request timed out. Please try again.');
        setIsLoading(false);
        setWorkingNotes('Query timed out after 30 seconds.');
        return;
      }

      if (await checkResult(id)) {
        cleanup();
      }
    }, 1000);

    return cleanup;
  }, [checkResult]);

  const submitQuery = async (queryText: string = query) => {
    if (!queryText.trim()) return;

    // Reset states
    setIsLoading(true);
    setStatus('loading');
    setStatusMessage('Submitting query...');
    setResult(null);
    setWorkingNotes('Processing query...');

    try {
      const response = await fetch(ENDPOINTS.submit, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query_text: queryText }),
      });

      if (!response.ok) throw new Error('Failed to submit query');

      const data = await response.json();
      setQueryHistory(prev => [
        { text: queryText, timestamp: Date.now(), id: data.query_id },
        ...prev.slice(0, 4),
      ]);
      
      startPolling(data.query_id);
      setWorkingNotes('Query submitted successfully. Retrieving relevant documents...');
    } catch (err) {
      const error = err as Error;
      setStatus('error');
      setStatusMessage('Error submitting query: ' + error.message);
      setIsLoading(false);
      setWorkingNotes('Error occurred while processing query.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Sample Queries */}
            {sampleQueries.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Sample Queries:</h3>
                <div className="flex flex-wrap gap-2">
                  {sampleQueries.map((sampleQuery, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(sampleQuery);
                        submitQuery(sampleQuery);
                      }}
                      className="bg-white px-3 py-1 rounded-full text-sm border hover:bg-blue-50 transition-colors"
                      disabled={isLoading}
                    >
                      {sampleQuery}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Query Input */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Query Input:</label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full p-3 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            {/* Working Notes */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Working Notes:</label>
              <textarea
                value={workingNotes}
                readOnly
                className="w-full p-3 border rounded-md h-24 bg-gray-50"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={() => submitQuery()}
              disabled={isLoading || !query.trim()}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Submit Query'
              )}
            </button>

            {/* Status Message */}
            {status && <StatusMessage status={status} message={statusMessage} />}

            {/* Results */}
            {result && result.answer_text && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">Answer:</h3>
                    <button
                      onClick={() => navigator.clipboard.writeText(result.answer_text || '')}
                      className="p-1 hover:bg-gray-200 rounded"
                      title="Copy answer"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap text-gray-700">{result.answer_text}</p>
                </div>

                {result.sources && result.sources.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">References:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {result.sources.map((source, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          {source}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Query History */}
            {queryHistory.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2 flex items-center">
                  <History className="h-4 w-4 mr-1" />
                  Recent Queries:
                </h3>
                <div className="space-y-2">
                  {queryHistory.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm text-gray-600"
                    >
                      <span>{item.text}</span>
                      <button
                        onClick={() => {
                          setQuery(item.text);
                          submitQuery(item.text);
                        }}
                        className="ml-2 p-1 hover:bg-gray-100 rounded"
                        disabled={isLoading}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RAGInterface;