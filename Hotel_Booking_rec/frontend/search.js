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
                    div.textContent = `Hotel Name: ${item['Hotel Name'] || 'N/A'}, Total Rooms: ${item['Total Rooms'] || 'N/A'}`;
                    div.addEventListener('click', () => {
                        console.log('Item clicked:', item);
                        // Optionally, you can also handle item click here
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

// Function to hide recommendations dropdown
function hideRecommendations() {
    document.getElementById('recommendations').style.display = 'none';
}

// Event listener for clicks outside the search bar and recommendations dropdown
document.addEventListener('click', function(event) {
    const searchBar = document.getElementById('search-bar');
    const recommendations = document.getElementById('recommendations');

    if (!searchBar.contains(event.target) && !recommendations.contains(event.target)) {
        hideRecommendations();
    }
});
