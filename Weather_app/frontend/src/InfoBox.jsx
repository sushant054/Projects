import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CircularProgress from "@mui/material/CircularProgress"; 
import "./InfoBox.css";

export default function InfoBox({ info }) {
    const INIT_URL = "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500&auto=format&fit=crop&q=60";
    const HOT_URL = "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500&auto=format&fit=crop&q=60";
    const COLD_URL = "https://images.unsplash.com/photo-1617120351334-7922c6cfcfca?w=500&auto=format&fit=crop&q=60";
    const RAIN_URL = "https://media.istockphoto.com/id/1321878632/photo/cloudy-sky-over-beautiful-flood-plain-landscape.jpg?s=1024x1024&w=is&k=20&c=atFo11YKMbuCIQw1socJut8Krs4KULlnaT1BWW8oUos=";

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!info) return;
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [info]);

    const tempC = info ? (info.temp - 273.15).toFixed(2) : "";
    const tempMaxC = info ? (info.tempMax - 273.15).toFixed(2) : "";
    const tempMinC = info ? (info.tempMin - 273.15).toFixed(2) : "";
    const feelsLikeC = info ? (info.feelslike - 273.15).toFixed(2) : "";

    const isRainy = info?.humidity > 80;
    const isCold = tempC < 10;
    const weatherImage = isCold ? COLD_URL : isRainy ? RAIN_URL : HOT_URL;
    const WeatherIcon = isCold ? AcUnitIcon : isRainy ? ThunderstormIcon : WbSunnyIcon;

    return (
        <div className="InfoBox">
            <div className="cardContainer">
                <Card className="MuiCard-root">
                    {loading && (
                        <div className="loader-overlay">
                            <CircularProgress color="inherit" />
                        </div>
                    )}

                    <CardMedia className="MuiCardMedia-root" image={weatherImage} title="Weather Image" />
                    
                    <CardContent className="MuiCardContent-root">
                        {!loading && info ? (
                            <>
                                <Typography gutterBottom variant="h5" component="div">
                                    {info.city} <WeatherIcon />
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    <p>Temperature: {tempC}°C</p>
                                    <p>Humidity: {info.humidity}%</p>
                                    <p>Max Temperature: {tempMaxC}°C</p>
                                    <p>Min Temperature: {tempMinC}°C</p>
                                    <p>
                                        The weather is described as <i>{info.weather}</i> and
                                        feels like {feelsLikeC}°C.
                                    </p>
                                </Typography>
                            </>
                        ) : (
                            !loading && (
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    No weather data available.
                                </Typography>
                            )
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
