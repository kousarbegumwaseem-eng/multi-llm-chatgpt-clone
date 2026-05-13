import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Sidebar from './components/Sidebar';
import ResponseCard from './components/ResponseCard';

function App() {

  // ===============================
  // States
  // ===============================
  const [prompt, setPrompt] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(
  'You are a helpful AI assistant.'
);

  const [chatgpt, setChatgpt] = useState('');
  const [gemini, setGemini] = useState('');
  const [claude, setClaude] = useState('');

  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [selectedModel, setSelectedModel] = useState('ChatGPT');

  // ===============================
  // Load History On Start
  // ===============================
  useEffect(() => {

    fetchHistory();

  }, []);
  
  useEffect(() => {

  messagesEndRef.current?.scrollIntoView({
    behavior: 'smooth'
  });

}, [messages]);

  // ===============================
// Start New Chat
// ===============================
const newChat = () => {



  setPrompt('');

  setChatgpt('');
  setGemini('');
  setClaude('');
  setMessages([]);
};

// ===============================
// Continue With Selected Model
// ===============================
const continueChat = (model) => {

  setSelectedModel(model);

  alert(`Continuing with ${model}`);
};
  // ===============================
  // Fetch History
  // ===============================
  const fetchHistory = async () => {

    try {

      const response = await axios.get(
        'http://localhost:5000/history'
      );

      setHistory(response.data);

    } catch (error) {

      console.log(error);
    }
  };
// ===============================
// Delete Chat
// ===============================
const deleteChat = async (id) => {

  alert('Delete clicked');

  try {

    await axios.delete(
      `http://localhost:5000/delete-chat/${id}`
    );

    fetchHistory();

  } catch (error) {

    console.log(error);

    alert('Delete failed');
  }
};

  // ===============================
  // Load Old Chat
  // ===============================
  const loadChat = (chat) => {

    setPrompt(chat.prompt);

    setChatgpt(chat.chatgpt);
    setGemini(chat.gemini);
    setClaude(chat.claude);
    setMessages([
  {
    prompt: chat.prompt,
    chatgpt: chat.chatgpt,
    gemini: chat.gemini,
    claude: chat.claude
  }
]);
  };

  // ===============================
  // Generate Responses
  // ===============================
  const generateResponses = async () => {

    if (!prompt.trim()) {

      alert('Please enter a prompt');
      return;
    }

    setLoading(true);

    try {

      const response = await axios.post(
        'http://localhost:5000/chat',
        {
  prompt: prompt,
  systemPrompt: systemPrompt
}
      );

      setChatgpt(response.data.chatgpt);
      setGemini(response.data.gemini);
      setClaude(response.data.claude);
      setMessages((prev) => [

  ...prev,

  {
    prompt: prompt,
    chatgpt: response.data.chatgpt,
    gemini: response.data.gemini,
    claude: response.data.claude
  }
]);

      fetchHistory();

    } catch (error) {

      alert('Backend connection failed');

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // ===============================
  // UI
  // ===============================
  return (

    <div style={{ display: 'flex' }}>

      {/* Sidebar */}
     <Sidebar
  history={history}
  loadChat={loadChat}
  newChat={newChat}
  deleteChat={deleteChat}
/>
      {/* Main Content */}
      <div
        style={{
          backgroundColor: '#111827',
          minHeight: '100vh',
          padding: '30px',
          color: 'white',
          fontFamily: 'Arial',
          flex: 1
        }}
      >

        {/* Title */}
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}
        >
          Multi LLM ChatGPT Clone
        </h1>

        {/* Input */}
        <select
  value={selectedModel}

  onChange={(e) =>
    setSelectedModel(e.target.value)
  }

  style={{
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '20px',
    fontSize: '16px'
  }}
>

  <option>ChatGPT</option>

  <option>Gemini</option>

  <option>Claude</option>

</select>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {

  if (e.key === 'Enter' && !e.shiftKey) {

    e.preventDefault();

    generateResponses();
  }
}}
          placeholder="Ask anything..."
          style={{
            width: '100%',
            height: '120px',
            padding: '15px',
            borderRadius: '10px',
            fontSize: '16px',
            border: 'none',
            outline: 'none'
          }}
        />

        {/* Button */}
        <button
          onClick={generateResponses}
          style={{
            marginTop: '20px',
            padding: '12px 25px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Loading...' : 'Generate Responses'}
        </button>

        {/* Chat Messages */}
<div
  style={{
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  }}
>

  {
    messages.map((msg, index) => (

      <div
        key={index}
        style={{
          backgroundColor: '#1f2937',
          padding: '20px',
          borderRadius: '15px'
        }}
      >

        {/* User Prompt */}
        <div style={{ marginBottom: '20px' }}>

          <h3>User</h3>

          <p>{msg.prompt}</p>

        </div>

        <div
  style={{
    display: 'flex',
    gap: '20px',
    marginTop: '20px'
  }}
>

 <ResponseCard
  title="ChatGPT"
  response={msg.chatgpt}
  loading={false}
  continueChat={continueChat}
/>

  <ResponseCard
  title="Gemini"
  response={msg.gemini}
  loading={false}
  continueChat={continueChat}
/>

  <ResponseCard
  title="Claude"
  response={msg.claude}
  loading={false}
  continueChat={continueChat}
/>

</div>

      </div>
    ))
  }

</div> 
<div ref={messagesEndRef}></div>

      </div>

    </div>
  );
}

export default App;