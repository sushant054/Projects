# Weather Application (Full Stack: React + Node.js)

 
 This is a **Full Stack Weather App** using **React** and **Node.js**. Users can search weather by city or geolocation, fetching real-time data from the **OpenWeatherMap API**.

## Features

- **Search by City**: Fetch weather information by entering a city name.
- **Geolocation**: Automatically fetch weather using your current location.
- **Temperature, Humidity & More**: Display detailed weather information.
- **Responsive Design**: Powered by **Material-UI** for a modern look.
- **Backend Integration**: Node.js server handles API calls securely.

 

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository_url>
cd weather-app
```

---

##  Backend Setup (Node.js)

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install express axios dotenv cors body-parser
```

3. Set Up Environment Variables:
Create a `.env` file in the `backend/` folder:

```
WEATHER_API_KEY=your_openweathermap_api_key
```

> Get your API key from [OpenWeatherMap](https://openweathermap.org/api).

4. Start the backend server:
```bash
node server.js
```

Server runs on: `http://localhost:5000`

---

## Frontend Setup (React)

1. Navigate to the frontend folder:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
npm install @mui/material @mui/icons-material
```

3. Run the React application:
```bash
npm run dev
```
 
---

## API Endpoints

### 1. Get Weather by City
**Request:**
```bash
GET /api/weather?city=London
```

**Response:**
```json
{
  "city": "London",
  "temp": 22.5,
  "tempMin": 21.0,
  "tempMax": 23.5,
  "humidity": 60,
  "feelslike": 23.0,
  "weather": "clear sky"
}
```

### 2. Get Weather by Geolocation
**Request:**
```bash
GET /api/weather?lat=51.5074&lon=-0.1278
```

**Response:**
```json
{
  "city": "London",
  "temp": 22.5,
  "tempMin": 21.0,
  "tempMax": 23.5,
  "humidity": 60,
  "feelslike": 23.0,
  "weather": "clear sky"
}
```

### 3. Error Response
```json
{
  "error": "City or latitude/longitude are required."
}
```

---
 
 