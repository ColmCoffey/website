import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Loader2, Copy, Share2, RefreshCw, History, AlertCircle, Info, CheckCircle } from 'lucide-react';

const StatusMessage = ({ status, message }) => {
  const icons = {
    loading: <Loader2 className="h-5 w-5 animate-spin text-blue-500" />,
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
  };

  const statusClasses = {
    loading: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  };

  return status ? (
    <div className={`flex items-center p-4 border rounded-md ${statusClasses[status]}`}>
      <div className="mr-3">{icons[status]}</div>
      <span>{message}</span>
    </div>
  ) : null;
};

const DEFAULT_SAMPLE_QUERIES = {
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
}) => {
  const [query, setQuery] = useState('');
  const [workingNotes, setWorkingNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [queryId, setQueryId] = useState('');
  const [queryHistory, setQueryHistory] = useState([]);

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
    getResult: (id) => `${apiEndpoint}/get_query?query_id=${id}`
  };

  const sampleQueries = customSampleQueries || DEFAULT_SAMPLE_QUERIES[topic] || [];

  const submitQuery = async (queryText = query) => {
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
      setQueryId(data.query_id);
      setQueryHistory(prev => [
        { text: queryText, timestamp: Date.now(), id: data.query_id },
        ...prev.slice(0, 4),
      ]);
      
      startPolling(data.query_id);
      setWorkingNotes('Query submitted successfully. Retrieving relevant documents...');
    } catch (err) {
      setStatus('error');
      setStatusMessage('Error submitting query: ' + err.message);
      setIsLoading(false);
      setWorkingNotes('Error occurred while processing query.');
    }
  };

  const checkResult = async (id) => {
    try {
      const response = await fetch(ENDPOINTS.getResult(id));
      if (!response.ok) throw new Error('Failed to fetch results');

      const data = await response.json();
      
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
      setStatus('error');
      setStatusMessage('Error checking results: ' + err.message);
      setIsLoading(false);
      setWorkingNotes('Error occurred while retrieving results.');
      return true;
    }
  };

  const startPolling = async (id) => {
    let attempts = 0;
    const maxAttempts = 30;
    let pollInterval;
    
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

    // Cleanup on component unmount
    return cleanup;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Sample Queries */}
            {sampleQueries.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 dark:text-gray-200">Sample Queries:</h3>
                <div className="flex flex-wrap gap-2">
                  {sampleQueries.map((sampleQuery, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(sampleQuery);
                        submitQuery(sampleQuery);
                      }}
                      className="bg-white dark:bg-gray-600 px-3 py-1 rounded-full text-sm border dark:border-gray-500 hover:bg-blue-50 dark:hover:bg-gray-500 transition-colors dark:text-gray-200"
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
              <label className="font-semibold dark:text-gray-200">Query Input:</label>
              <div className="flex">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  rows={3}
                  disabled={isLoading}
                />
                <button
                  onClick={() => submitQuery()}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md disabled:opacity-50"
                  disabled={!query.trim() || isLoading}
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit'}
                </button>
              </div>
            </div>

            {/* Working Notes */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold dark:text-gray-200">Working Notes:</label>
              <textarea
                value={workingNotes}
                readOnly
                className="w-full p-3 border rounded-md h-24 bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>

            {/* Status Message */}
            {status && <StatusMessage status={status} message={statusMessage} />}

            {/* Results */}
            {result && (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold dark:text-gray-200">Answer:</h3>
                    <button
                      onClick={() => navigator.clipboard.writeText(result.answer)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                      title="Copy answer"
                    >
                      <Copy className="h-4 w-4 dark:text-gray-200" />
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-200">{result.answer_text}</p>
                </div>

                {result.sources?.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 dark:text-gray-200">References:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {result.sources.map((source, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-300">
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
              <div className="border-t dark:border-gray-600 pt-4">
                <h3 className="font-semibold mb-2 flex items-center dark:text-gray-200">
                  <History className="h-4 w-4 mr-1" />
                  Recent Queries:
                </h3>
                <div className="space-y-2">
                  {queryHistory.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span>{item.text}</span>
                      <button
                        onClick={() => {
                          setQuery(item.text);
                          submitQuery(item.text);
                        }}
                        className="ml-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
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