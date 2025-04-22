// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { format } from 'date-fns';

export default function Home() {
  const [apiKeys, setApiKeys] = useState({
    limitless: '',
    openai: '',
    anthropic: ''
  });
  const [isConfigured, setIsConfigured] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [summary, setSummary] = useState('');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [model, setModel] = useState('openai');

  // Check if API keys are stored in localStorage on component mount
  useEffect(() => {
    const storedLimitlessKey = localStorage.getItem('limitlessApiKey');
    const storedOpenAIKey = localStorage.getItem('openaiApiKey');
    const storedAnthropicKey = localStorage.getItem('anthropicApiKey');
    
    if (storedLimitlessKey) {
      setApiKeys(prev => ({ ...prev, limitless: storedLimitlessKey }));
    }
    
    if (storedOpenAIKey) {
      setApiKeys(prev => ({ ...prev, openai: storedOpenAIKey }));
      setModel('openai');
    }
    
    if (storedAnthropicKey) {
      setApiKeys(prev => ({ ...prev, anthropic: storedAnthropicKey }));
      if (!storedOpenAIKey) setModel('anthropic');
    }
    
    setIsConfigured(!!storedLimitlessKey && (!!storedOpenAIKey || !!storedAnthropicKey));
  }, []);

  // Save API keys to localStorage
  const saveApiKeys = () => {
    localStorage.setItem('limitlessApiKey', apiKeys.limitless);
    localStorage.setItem('openaiApiKey', apiKeys.openai);
    localStorage.setItem('anthropicApiKey', apiKeys.anthropic);
    setIsConfigured(true);
  };

  // Handle API key input changes
  const handleApiKeyChange = (key, value) => {
    setApiKeys(prev => ({ ...prev, [key]: value }));
  };

  // Send message to API
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate response based on input
      let response;
      if (input.toLowerCase().includes('limitless') || input.toLowerCase().includes('pendant')) {
        response = "Your Limitless pendant data shows that you've been quite active today. You took 8,500 steps and had 3 meetings. Your heart rate averaged 72 BPM.";
      } else if (input.toLowerCase().includes('fireflies') || input.toLowerCase().includes('meeting')) {
        response = "According to your Fireflies notes, your last meeting was with the marketing team discussing Q2 goals. The key action items were to finalize the campaign budget and schedule a follow-up for next week.";
      } else if (input.toLowerCase().includes('summary')) {
        response = "Today's summary: You had 3 meetings, spent 2.5 hours in focused work, and took a 30-minute walk around noon. Your productivity score is 85% based on your Limitless data.";
      } else {
        response = "I'm your personal AI assistant trained on your Limitless pendant and Fireflies data. You can ask me about your activities, meetings, health metrics, or request summaries of your day.";
      }
      
      // Add assistant response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch summary for selected date
  const fetchSummary = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate summary based on date
      const today = format(new Date(), 'yyyy-MM-dd');
      let summaryText;
      
      if (selectedDate === today) {
        summaryText = `# Daily Summary for ${selectedDate}\n\n## Activities\n- 8,500 steps taken\n- 3 meetings attended (total duration: 2.5 hours)\n- 30-minute walk at 12:15 PM\n- 2.5 hours of focused work\n\n## Health Metrics\n- Average heart rate: 72 BPM\n- Sleep last night: 7.2 hours\n- Stress level: Low\n\n## Meetings\n1. **Morning Standup** (9:00 AM - 9:15 AM)\n   - Team status updates\n   - Sprint planning discussion\n\n2. **Marketing Strategy** (11:00 AM - 12:00 PM)\n   - Discussed Q2 campaign goals\n   - Action items: Finalize budget, schedule follow-up\n\n3. **Client Call** (2:00 PM - 3:15 PM)\n   - Project status review\n   - Client expressed satisfaction with progress\n\n## Notes\nYour productivity score today is 85%, which is above your weekly average of 78%.`;
      } else {
        summaryText = `# Daily Summary for ${selectedDate}\n\n## Activities\n- 7,200 steps taken\n- 2 meetings attended (total duration: 1.5 hours)\n- 45-minute gym session at 5:30 PM\n- 3 hours of focused work\n\n## Health Metrics\n- Average heart rate: 68 BPM\n- Sleep: 7.5 hours\n- Stress level: Medium\n\n## Meetings\n1. **Team Collaboration** (10:00 AM - 11:00 AM)\n   - Project milestone review\n   - Resource allocation discussion\n\n2. **One-on-One** (3:00 PM - 3:30 PM)\n   - Career development discussion\n   - Feedback on recent project\n\n## Notes\nYour productivity score was 80%, consistent with your weekly average.`;
      }
      
      setSummary(summaryText);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Failed to fetch summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle date change
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Handle model change
  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Fetch summary when tab or date changes
  useEffect(() => {
    if (activeTab === 'daily' && isConfigured) {
      fetchSummary();
    }
  }, [activeTab, selectedDate, isConfigured]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Limitless Chat App</title>
        <meta name="description" content="Chat with your Limitless pendant data" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </Head>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Limitless Chat App</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!isConfigured ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Setup Your API Keys</h2>
            <p className="mb-4 text-gray-600">
              To use this application, you need to provide your API keys for Limitless and at least one LLM provider.
            </p>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="limitlessKey">
                Limitless API Key (Required)
              </label>
              <input
                id="limitlessKey"
                type="password"
                className="w-full p-2 border rounded"
                value={apiKeys.limitless}
                onChange={(e) => handleApiKeyChange('limitless', e.target.value)}
                placeholder="sk-2a4a4d9e-..."
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="openaiKey">
                OpenAI API Key
              </label>
              <input
                id="openaiKey"
                type="password"
                className="w-full p-2 border rounded"
                value={apiKeys.openai}
                onChange={(e) => handleApiKeyChange('openai', e.target.value)}
                placeholder="sk-proj-W1Jn2wQ7g..."
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="anthropicKey">
                Anthropic API Key
              </label>
              <input
                id="anthropicKey"
                type="password"
                className="w-full p-2 border rounded"
                value={apiKeys.anthropic}
                onChange={(e) => handleApiKeyChange('anthropic', e.target.value)}
                placeholder="sk-ant-api03-BT8Q2PA..."
              />
            </div>
            
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              onClick={saveApiKeys}
              disabled={!apiKeys.limitless || (!apiKeys.openai && !apiKeys.anthropic)}
            >
              Save and Continue
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    activeTab === 'chat'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('chat')}
                >
                  Chat
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'daily'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('daily')}
                >
                  Daily Summary
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    activeTab === 'settings'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('settings')}
                >
                  Settings
                </button>
              </div>
            </div>

            {activeTab === 'chat' && (
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Chat with Your Data</h2>
                    <div>
                      <select
                        value={model}
                        onChange={handleModelChange}
                        className="p-2 border rounded text-sm"
                        disabled={isLoading}
                      >
                        {apiKeys.openai && <option value="openai">OpenAI GPT-4</option>}
                        {apiKeys.anthropic && <option value="anthropic">Anthropic Claude</option>}
                      </select>
                    </div>
                  </div>
                  {selectedDate && (
                    <p className="text-sm text-gray-500 mt-1">
                      Using data from: {selectedDate}
                    </p>
                  )}
                </div>
                
                <div className="h-96 overflow-y-auto p-4 bg-gray-50">
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-gray-500">
                        <p className="mb-2">Start a conversation with your Limitless data</p>
                        <p className="text-sm">Try asking about your day, meetings, or conversations</p>
                      </div>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`mb-4 ${
                          message.role === 'user' ? 'text-right' : 'text-left'
                        }`}
                      >
                        <div
                          className={`inline-block max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="text-left mb-4">
                      <div className="inline-block max-w-xs sm:max-w-md px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-100"></div>
                          <div className="w-2 h-2 rounded-full bg-gray-500 animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex">
                    <textarea
                      className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ask a question about your data..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                      rows={2}
                    />
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition disabled:bg-blue-300"
                      onClick={sendMessage}
                      disabled={isLoading || !input.trim()}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'daily' && (
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h2 className="text-xl font-semibold mb-2 sm:mb-0">Daily Summary</h2>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="p-2 border rounded text-sm"
                        max={format(new Date(), 'yyyy-MM-dd')}
                      />
                      <select
                        value={model}
                        onChange={handleModelChange}
                        className="p-2 border rounded text-sm"
                        disabled={isLoading}
                      >
                        {apiKeys.openai && <option value="openai">OpenAI GPT-4</option>}
                        {apiKeys.anthropic && <option value="anthropic">Anthropic Claude</option>}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : summary ? (
                    <div className="prose max-w-none whitespace-pre-line">
                      {summary}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 p-4">
                      Select a date to view a summary of your day
                    </div>
                  )}
                </div>
                
                <div className="p-4 bg-gray-50 border-t">
                  <p className="text-sm text-gray-500">
                    This summary is generated from your Limitless pendant data for {selectedDate}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="limitlessKey">
                    Limitless API Key
                  </label>
                  <input
                    id="limitlessKey"
                    type="password"
                    className="w-full p-2 border rounded"
                    value={apiKeys.limitless}
                    onChange={(e) => handleApiKeyChange('limitless', e.target.value)}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="openaiKey">
                    OpenAI API Key
                  </label>
                  <input
                    id="openaiKey"
                    type="password"
                    className="w-full p-2 border rounded"
                    value={apiKeys.openai}
                    onChange={(e) => handleApiKeyChange('openai', e.target.value)}
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="anthropicKey">
                    Anthropic API Key
                  </label>
                  <input
                    id="anthropicKey"
                    type="password"
                    className="w-full p-2 border rounded"
                    value={apiKeys.anthropic}
                    onChange={(e) => handleApiKeyChange('anthropic', e.target.value)}
                  />
                </div>
                
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                  onClick={saveApiKeys}
                >
                  Update Settings
                </button>
                
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <h3 className="font-bold mb-2">About API Keys</h3>
                  <p className="text-sm text-gray-600">
                    Your API keys are stored locally in your browser and are never sent to our servers.
                    They are only used to make direct API calls to the respective services.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>Limitless Chat App - Chat with your personal data</p>
        </div>
      </footer>
    </div>
  );
}
