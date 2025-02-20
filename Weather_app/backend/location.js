const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

router.get('/weather', async (req, res) => {
    const { lat, lon, city } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;

    try {
        let url = '';
        // Choose the URL based on query parameters
        if (city) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        } else if (lat && lon) {
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        } else {
            return res.status(400).json({ error: 'City or latitude/longitude are required.' });
        }
        const response = await axios.get(url);
        const data = response.data;
        // Structure the weather data to match your frontend
        const weatherInfo = {
            city: data.name,
            temp: data.main.temp,
            tempMin: data.main.temp_min,
            tempMax: data.main.temp_max,
            humidity: data.main.humidity,
            feelslike: data.main.feels_like,
            weather: data.weather[0].description,
        };

        res.json(weatherInfo);
    } catch (error) {
        console.error('Error fetching weather data:', error.response?.data || error.message);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

module.exports = router;
