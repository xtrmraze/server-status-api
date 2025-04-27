const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Simple API route to check server status
app.get('/status', async (req, res) => {
    const { ip, port: serverPort = 19132 } = req.query;
    
    if (!ip) {
        return res.status(400).json({ error: 'Missing IP address.' });
    }

    try {
        const response = await axios.get(`https://api.mcstatus.io/v2/status/bedrock/${ip}:${serverPort}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch server status.' });
    }
});

// Basic home page
app.get('/', (req, res) => {
    res.send('Server Status API is running.');
});

// Start server
app.listen(port, () => {
    console.log(`Server Status API is live on port ${port}`);
});
