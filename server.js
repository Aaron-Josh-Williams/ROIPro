const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000; // You can choose any available port

app.use(express.json());

app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.query;
        const response = await fetch(`https://api.zillow.com/your-endpoint?query=${query}`, {
            headers: {
                'Authorization': 'Bearer YOUR_RAPIDAPI_KEY',
                // Add other necessary headers
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching real estate data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
