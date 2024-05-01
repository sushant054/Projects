const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Mock data for search suggestions
const searchSuggestions = 
{
    "Transportation": [
        "Taxi/ride-sharing services",
        "Rental cars"
    ],
    "Healthcare": [
        "Doctors",
        "Clinics"
    ],
    "Retail": [
        "Supermarkets/grocery stores",
        "Clothing stores",
        "Electronics stores",
        "Specialty (bookstores, gift shops, etc.)"
    ],
    "Information Technology": [
        "Internet service provider (ISP)",
        "IT consulting firms",
        "Web hosting companies",
        "Cybersecurity firms"
    ],
    "Education": [
        "Tutoring services",
        "Language schools (like French, German, etc.)"
    ],
    "Legal Services": [
        "Legal consultancies",
        "Notary services"
    ]

};

// Route to handle search suggestions
app.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const suggestions = Object.keys(searchSuggestions).filter(domain => domain.toLowerCase().includes(query));
    res.json({ suggestions });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//http://localhost:3000/search?q=transportation....search like this ......


