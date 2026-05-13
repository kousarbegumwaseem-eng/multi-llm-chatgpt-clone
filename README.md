# 🤖 Multi-LLM ChatGPT Clone

A full-stack Multi-LLM ChatGPT Clone built using React, Node.js, Express, and PostgreSQL.  
This project demonstrates side-by-side AI response comparison, prompt handling, system prompt concepts, chat history management, and multi-model conversation flow.

---

# 🚀 Features

- Multi-LLM side-by-side response comparison
- Continue conversation with selected model
- Prompt and System Prompt support
- Chat history sidebar
- Delete chat functionality
- Copy response button
- Auto-scroll chat interface
- Dynamic React state management
- PostgreSQL database integration
- Responsive dark-themed UI

---

# 🏗️ Tech Stack

## Frontend
- React.js
- Vite
- Axios

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL

---

# 🧠 AI Concepts Implemented

- Prompt vs System Prompt
- Multi-LLM Architecture
- Side-by-side Model Comparison
- Conversation Continuation
- Frontend-Backend API Communication
- Chat Session Management

---

# 📂 Project Structure

```bash
multi-llm-chatgpt-clone
│
├── client
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## 1. Clone Project

```bash
git clone <your-github-repository-link>
```

---

## 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 3. Backend Setup

```bash
cd server
npm install
node server.js
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🔐 Environment Variables

Create `.env` inside the `server` folder.

Example:

```env
PORT=5000

DB_HOST=localhost

DB_USER=postgres

DB_PASSWORD=your_password

DB_NAME=multi_llm_db

DB_PORT=5432
```

---

# 💬 Prompt vs System Prompt

## Prompt
The user message entered into the chat interface.

Example:

```text
What is Artificial Intelligence?
```

## System Prompt
An instruction given to the AI model before processing the user prompt.

Example:

```text
You are a helpful AI assistant.
```

System prompts control:
- AI behavior
- tone
- personality
- response style

---

# 🔮 Future Improvements

- OpenAI API integration
- Gemini API integration
- Claude API integration
- Authentication system
- Cloud deployment
- Advanced chat session management

---

# 👨‍💻 Author

Created as part of AI/ML project learning and Multi-LLM architecture practice.