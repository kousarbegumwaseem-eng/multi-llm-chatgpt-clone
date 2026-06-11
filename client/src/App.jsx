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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState('');

   const [password, setPassword] = useState('');

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
// Check Login
// ===============================
useEffect(() => {

    const user = localStorage.getItem('user');

    if (user) {

        setIsLoggedIn(true);
    }

}, []);

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
  `${import.meta.env.VITE_API_URL}/history`
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
  `${import.meta.env.VITE_API_URL}/delete-chat/${id}`
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
// Login
// ===============================
const handleLogin = () => {

    if (!username || !password) {

        alert('Please enter username and password.');

        return;
    }

    localStorage.setItem('user', username);

    setIsLoggedIn(true);

    setUsername('');

    setPassword('');
};

// ===============================
// Logout
// ===============================
const handleLogout = () => {

    localStorage.removeItem('user');

    setIsLoggedIn(false);
};

    

  // ===============================
  // Generate Responses
  // ===============================
  const generateResponses = async () => {

    if (!prompt.trim()) {

      alert('Please type a prompt before generating responses.');
      return;
    }

    setLoading(true);

    try {

    const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/chat`,
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

     alert('Unable to connect to backend server.');

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // ===============================
  // UI
  // ===============================
  
  if (!isLoggedIn) {

  return (

    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0b1120',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >

      <div
        style={{
          backgroundColor: '#111827',
          padding: '40px',
          borderRadius: '20px',
          width: '350px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
        }}
      >

        <h1
          style={{
            textAlign: 'center',
            marginBottom: '40px',
            color: 'white',
            fontSize: '32px',
          }}
        >
          Multi LLM Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '10px',
            border: '1px solid #374151',
            backgroundColor: '#0f172a',
            color: 'white',
            boxSizing: 'border-box'
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '10px',
            border: '1px solid #374151',
            backgroundColor: '#0f172a',
            color: 'white',
            boxSizing: 'border-box'
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#2563eb',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Login
        </button>

      </div>

    </div>
  );
}

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
         backgroundColor: '#0b1120',
          minHeight: '100vh',
          padding: '40px',
          color: 'white',
          fontFamily: 'Arial',
          flex: 1
        }}
      >

        {/* Title */}
        <h1
          style={{
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '40px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: '#f8fafc',
    textShadow: '0 2px 8px rgba(0,0,0,0.4)',
       }}
        >
          Multi LLM ChatGPT Clone
        </h1>

        <p
  style={{
    textAlign: 'center',
    color: '#94a3b8',
    marginBottom: '40px',
    fontSize: '16px'
  }}
>
  Compare AI responses from ChatGPT, Gemini, and Claude in one place.
</p>

<div
  style={{
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px'
  }}
>

  <button
    onClick={handleLogout}
    style={{
      padding: '10px 16px',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: '#334155',
      color: 'white',
      cursor: 'pointer',
      fontWeight: 'bold'
    }}
  >
    Logout
  </button>

</div>

        {/* Input */}
        <select
  value={selectedModel}

  onChange={(e) =>
    setSelectedModel(e.target.value)
  }

  style={{
    padding: '12px 16px',
    borderRadius: '10px',
    marginBottom: '20px',
    fontSize: '15px',
    backgroundColor: '#1f2937',
    color: 'white',
    border: '1px solid #374151',
    outline: 'none',
    cursor: 'pointer'
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
    height: '140px',
    padding: '18px',
    borderRadius: '15px',
    fontSize: '16px',
    border: '1px solid #374151',
    outline: 'none',
    backgroundColor: '#1f2937',
    color: 'white',
    resize: 'none',
    marginTop: '10px',
    lineHeight: '1.6',
    boxSizing: 'border-box',
}}
        />

        {/* Button */}
        <button
          onClick={generateResponses}
          style={{
    marginTop: '20px',
    padding: '14px 28px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: '0.3s',
    opacity: loading ? 0.7 : 1,

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
  messages.length === 0 && (

    <div
      style={{
        textAlign: 'center',
        marginTop: '80px',
        color: '#94a3b8'
      }}
    >

      <h2
        style={{
          marginBottom: '15px'
        }}
      >
        Start Your AI Conversation
      </h2>

      <p>
        Compare ChatGPT, Gemini, and Claude responses side-by-side.
      </p>

    </div>
  )
}

  {
    messages.map((msg, index) => (

      <div
        key={index}
        ref={index === messages.length - 1 ? messagesEndRef : null}
        style={{
   backgroundColor: '#111827',
    padding: '25px',
    borderRadius: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
}}
      >

        {/* User Prompt */}
        <div
  style={{
    marginBottom: '25px',
    padding: '15px',
  backgroundColor: '#0f172a',
    borderRadius: '12px'
  }}
>

         <h3
  style={{
    marginBottom: '10px',
    fontSize: '18px'
  }}
>
  User
</h3>

          <p
  style={{
    lineHeight: '1.7',
    fontSize: '16px'
  }}
>
  {msg.prompt}
</p>

        </div>

        <div
  style={{
    display: 'flex',
    gap: '20px',
    marginTop: '20px',
    flexWrap: 'wrap'
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


      </div>

    </div>
  );
}

export default App;