require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

app.get('/news', async (req, res) => {
  const category = req.query.category || 'general'; // Default category

  console.log('Fetching news for category:', category);
  console.log('Using API Key:', process.env.API_KEY);

  try {
    const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
      params: {
        category: category,
        lang: 'en',
        apikey: process.env.API_KEY
      }
    });
    console.log('API Response:', response.data); // Log the response data
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
