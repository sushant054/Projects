import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);

    const API_URL = "http://localhost:5000/api/weather";

    // Fetch weather information (by city or location)
    const getWeatherInfo = async () => {
        try {
            let url = `${API_URL}?city=${city}`;

            // If city is empty, fetch using geolocation
            if (!city) {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const { latitude, longitude } = position.coords;
                url = `${API_URL}?lat=${latitude}&lon=${longitude}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }

            const jsonResponse = await response.json();
            return {
                city: jsonResponse.city,
                temp: jsonResponse.temp,
                tempMin: jsonResponse.tempMin,
                tempMax: jsonResponse.tempMax,
                humidity: jsonResponse.humidity,
                feelslike: jsonResponse.feelslike,
                weather: jsonResponse.weather,
            };
        } catch (err) {
            console.error("Error fetching weather information:", err);
            throw err;
        }
    };

    // Handle city input change
    const handleChange = (evt) => {
        setCity(evt.target.value);
        setError(false); 
    };

    // Handle form submission
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setError(false);
        } catch (err) {
            setError(true);
            updateInfo(null);
        }

        setCity("");
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="Enter City name"
                    variant="outlined"
                    value={city}
                    onChange={handleChange}
                />
                <br /><br />
                <Button variant="contained" type="submit">Get Weather</Button>
                {error && <p style={{ color: "red" }}>No such place exists or location access denied!</p>}
            </form>
        </div>
    );
}
