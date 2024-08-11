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

    function displayHotelDetails(item) {
        console.log('Full Item:', item);  // Log to check the structure of the item

        const detailsSection = document.getElementById('hotel-details');

        // Update the HTML based on the actual key names
        detailsSection.innerHTML = `
            <h2>Hotel Details</h2>
            
            <p><strong>Hotel Name:</strong> ${item['Hotel Name'] || 'N/A'}</p>
            <p><strong>Category:</strong> ${item['Category'] || 'N/A'}</p>
            <p><strong>Address:</strong> ${item['Address'] || 'N/A'}</p>
            <p><strong>Start Date:</strong> ${item['Start Date'] || 'N/A'}</p>
            <p><strong>Expiry Date:</strong> ${item['Expiry Date'] || 'N/A'}</p>
            <p><strong>Total Rooms:</strong> ${item['Total Rooms'] || 'N/A'}</p>
            <button id="book-hotel" class="btn">Book Hotel</button>
        `;

        // Ensure the button exists before adding an event listener
        const bookButton = document.getElementById('book-hotel');
        if (bookButton) {
            bookButton.addEventListener('click', function() {
                // Pass hotel name through URL query parameter
                const bookingPageUrl = `booking.html?hotel_name=${encodeURIComponent(item['Hotel Name'] || '')}`;
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
