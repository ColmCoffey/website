import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Loader2, Copy, Share2, RefreshCw, History, AlertCircle, Info, CheckCircle } from 'lucide-react';

const StatusMessage = ({ status, message }) => {
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

const SAMPLE_QUERIES = [
  "What are the main symptoms of cervical dystonia?",
  "What is the role of botulinum toxin in treating cervical dystonia?",
  "How does deep brain stimulation help with cervical dystonia?",
  "What are the latest treatment developments for cervical dystonia?",
];

const EnhancedRAGInterface = () => {
  const [query, setQuery] = useState('');
  const [workingNotes, setWorkingNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [queryId, setQueryId] = useState('');
  const [queryHistory, setQueryHistory] = useState([]);

  const API_ENDPOINT = 'https://pp7ize56fqejnegjiuknrv3hbu0ijyij.lambda-url.eu-central-1.on.aws';

  const submitQuery = async (queryText = query) => {
    if (!queryText.trim()) return;

    // Reset states
    setIsLoading(true);
    setStatus('loading');
    setStatusMessage('Submitting query...');
    setResult(null);
    setWorkingNotes('Processing query...');

    try {
      const response = await fetch(API_ENDPOINT, {
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
      const response = await fetch(`${API_ENDPOINT}/get_query/${id}`);
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
      
      setWorkingNotes('Still processing... analyzing medical literature.');
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
    
    const pollInterval = setInterval(async () => {
      attempts++;
      
      if (attempts > maxAttempts) {
        clearInterval(pollInterval);
        setStatus('error');
        setStatusMessage('Request timed out. Please try again.');
        setIsLoading(false);
        setWorkingNotes('Query timed out after 30 seconds.');
        return;
      }

      if (await checkResult(id)) {
        clearInterval(pollInterval);
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Sample Queries */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Sample Queries:</h3>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_QUERIES.map((sampleQuery, index) => (
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

            {/* Query Input */}
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Query Input:</label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question about cervical dystonia..."
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
            {result && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">Answer:</h3>
                    <button
                      onClick={() => navigator.clipboard.writeText(result.answer)}
                      className="p-1 hover:bg-gray-200 rounded"
                      title="Copy answer"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap text-gray-700">{result.answer}</p>
                </div>

                {result.sources?.length > 0 && (
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
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Retry query"
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

export default EnhancedRAGInterface;