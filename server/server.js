const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { Pool } = require('pg');

const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());

app.use(express.json());

// ===============================
// PostgreSQL Connection
// ===============================
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'multillm',
    password: 'sql123',
    port: 5432,
});

// ===============================
// Home Route
// ===============================
app.get('/', (req, res) => {
    res.send('Backend Running');
});

// ===============================
// Chat Route
// ===============================
app.post('/chat', async (req, res) => {

    try {

       const userPrompt = req.body.prompt;

const systemPrompt = req.body.systemPrompt;

        // Fake AI Delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Dummy AI Responses
       const chatgptResponse =
`System Prompt:
${systemPrompt}

ChatGPT response for:
${userPrompt}`;

const geminiResponse =
`System Prompt:
${systemPrompt}

Gemini response for:
${userPrompt}`;

const claudeResponse =
`System Prompt:
${systemPrompt}

Claude response for:
${userPrompt}`;

        // Save Chat to PostgreSQL
        await pool.query(
            'INSERT INTO chats (prompt, chatgpt, gemini, claude) VALUES ($1, $2, $3, $4)',
            [userPrompt, chatgptResponse, geminiResponse, claudeResponse]
        );

        // Send response to frontend
        res.json({
            chatgpt: chatgptResponse,
            gemini: geminiResponse,
            claude: claudeResponse
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Database error'
        });
    }
});

// ===============================
// Get Chat History
// ===============================
app.get('/history', async (req, res) => {

    try {

        const result = await pool.query(
            'SELECT * FROM chats ORDER BY id DESC'
        );

        res.json(result.rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: 'Failed to fetch history'
        });
    }
});
// ===============================
// Delete Chat
// ===============================
app.delete('/delete-chat/:id', async (req, res) => {

    try {

        const chatId = req.params.id;

        await pool.query(
            'DELETE FROM chats WHERE id = $1',
            [chatId]
        );

        res.json({
            message: 'Chat deleted'
        });

   } catch (error) {

    console.log('DELETE ERROR:', error);

    res.status(500).json({
        error: error.message
    });
}
});
// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});