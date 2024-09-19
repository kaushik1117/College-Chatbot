import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [query, setQuery] = useState('');
    const [url, setUrl] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleQueryChange = (e) => setQuery(e.target.value);
    const handleUrlChange = (e) => setUrl(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/chatbot/response', {
                text: query,
                url: url,
            });
            setResponse(res.data.response);
        } catch (err) {
            setResponse('Error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4">College Chatbot</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Ask something..."
                        value={query}
                        onChange={handleQueryChange}
                        rows={3}
                    ></textarea>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="College website URL"
                        value={url}
                        onChange={handleUrlChange}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Send'}
                    </button>
                </form>
                {response && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-md">
                        <strong>Response:</strong>
                        <p>{response}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
