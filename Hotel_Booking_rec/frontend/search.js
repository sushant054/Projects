document.addEventListener('DOMContentLoaded', function() {
    // Handle search input
    document.getElementById('search-bar').addEventListener('input', function(event) {
        const searchTerm = event.target.value;

        console.log('Searching for:', searchTerm);

        fetch('http://localhost:3000/v1/hotel-bookings?search=' + encodeURIComponent(searchTerm))
            .then(response => response.json())
            .then(data => {
                console.log('Data received:', data);

                const recommendations = document.getElementById('recommendations');
                recommendations.innerHTML = '';

                if (data.length > 0) {
                    data.forEach(item => {
                        console.log('Item:', item);
                        const div = document.createElement('div');
                        div.className = 'recommendation-item';
                        div.textContent = `Hotel Name: ${item['Hotel Name'] || 'N/A'}`;
                        // Store the full item data in a data attribute
                        div.dataset.item = JSON.stringify(item);
                        div.addEventListener('click', () => {
                            displayHotelDetails(JSON.parse(div.dataset.item));
                            closeRecommendations(); // Close recommendations on selection
                        });
                        recommendations.appendChild(div);
                    });

                    recommendations.style.display = 'block';
                } else {
                    recommendations.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error during fetch or processing:', error);
                const recommendations = document.getElementById('recommendations');
                recommendations.innerHTML = '<div class="recommendation-item">An error occurred. Please try again.</div>';
                recommendations.style.display = 'block';
            });
    });

    function cleanObjectKeys(obj) {
        const cleanedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const cleanedKey = key.trim();
                cleanedObj[cleanedKey] = obj[key];
            }
        }
        return cleanedObj;
    }
    
    function displayHotelDetails(item) {
        const cleanedItem = cleanObjectKeys(item);
        console.log('Cleaned Item:', cleanedItem);  // Log to check the cleaned structure
    
        const detailsSection = document.getElementById('hotel-details');
    
        detailsSection.innerHTML = `
            <h2>Hotel Details</h2>
            
            <p><strong>Hotel ID:</strong> ${cleanedItem['Hid'] || 'N/A'}</p>
            <p><strong>Hotel Name:</strong> ${cleanedItem['Hotel Name'] || 'N/A'}</p>
            <p><strong>Category:</strong> ${cleanedItem['Category'] || 'N/A'}</p>
            <p><strong>Address:</strong> ${cleanedItem['Address'] || 'N/A'}</p>
            <p><strong>Start Date:</strong> ${cleanedItem['Start Date'] || 'N/A'}</p>
            <p><strong>Expiry Date:</strong> ${cleanedItem['Expiry Date'] || 'N/A'}</p>
            <p><strong>Total Rooms:</strong> ${cleanedItem['Total Rooms'] || 'N/A'}</p>
            <button id="book-hotel" class="btn">Book Hotel</button>
        `;
    
        const bookButton = document.getElementById('book-hotel');
        if (bookButton) {
            bookButton.addEventListener('click', function() {
                const bookingPageUrl = `booking.html?hotel_id=${encodeURIComponent(cleanedItem['Hid'] || '')}&hotel_name=${encodeURIComponent(cleanedItem['Hotel Name'] || '')}`;
                window.location.href = bookingPageUrl;
            });
        } else {
            console.error('Book Hotel button not found.');
        }
    
        detailsSection.style.display = 'block';
    }
    
    
    // Function to close recommendations dropdown
    function closeRecommendations() {
        const recommendations = document.getElementById('recommendations');
        if (recommendations) {
            recommendations.style.display = 'none';
        }
    }

    // Event listener to close recommendations when clicking outside
    document.addEventListener('click', function(event) {
        const searchBar = document.getElementById('search-bar');
        const recommendations = document.getElementById('recommendations');

        if (searchBar && recommendations) {
            if (!searchBar.contains(event.target) && !recommendations.contains(event.target)) {
                closeRecommendations();
            }
        }
    });
});
