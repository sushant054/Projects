document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const hotelName = params.get('hotel_name'); // Use the appropriate query parameter name

    if (hotelName) {
        fetch(`http://localhost:3000/v1/hotel-details?hotel_id=${encodeURIComponent(hotelName)}`)
            .then(response => response.json())
            .then(hotel => {
                if (hotel && hotel['Hotel Name']) {
                    const detailsContainer = document.getElementById('hotel-details');
                    detailsContainer.innerHTML = `
                        <h1>${hotel['Hotel Name']}</h1>
                        <p><strong>Address:</strong> ${hotel['Address']}</p>
                        <p><strong>City:</strong> ${hotel['City']}</p>
                        <p><strong>State:</strong> ${hotel['State']}</p>
                        <p><strong>Category:</strong> ${hotel['Category']}</p>
                        <p><strong>Alcohol:</strong> ${hotel['Alcohol']}</p>
                        <p><strong>Start Date:</strong> ${hotel['Start Date']}</p>
                        <p><strong>Expiry Date:</strong> ${hotel['Expiry Date']}</p>
                        <p><strong>Total Rooms:</strong> ${hotel['Total Rooms']}</p>
                    `;
                } else {
                    document.getElementById('hotel-details').innerHTML = '<p>Hotel not found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching hotel details:', error);
                document.getElementById('hotel-details').innerHTML = '<p>There was an error fetching the hotel details.</p>';
            });
    } else {
        document.getElementById('hotel-details').innerHTML = '<p>No hotel name provided.</p>';
    }
});
