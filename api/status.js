const fetch = require('node-fetch');

export default async function handler(req, res) {
    const ip = req.query.ip;
    const portQuery = req.query.port || 19132;

    if (!ip) {
        return res.status(400).json({ error: 'IP is required' });
    }

    try {
        const response = await fetch(`https://api.mcstatus.io/v2/status/bedrock/${ip}:${portQuery}`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch server status' });
    }
}
