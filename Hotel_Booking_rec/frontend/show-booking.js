document.addEventListener('DOMContentLoaded', () => {
    fetchBookings();
});

function fetchBookings() {
    fetch('http://localhost:3000/api/bookings') // Ensure this URL is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.querySelector('#bookingsTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            data.forEach(booking => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${booking.booking_id}</td>
                    <td>${booking.hotel_name}</td>
                    <td>${booking.check_in}</td>
                    <td>${booking.check_out}</td>
                    <td>${booking.guest}</td>
                    <td>${booking.room_type}</td>
                    <td>${booking.payment !== null ? booking.payment : 'N/A'}</td>
                    <td>${booking.status}</td>
                    <td><button class="delete-btn" onclick="deleteBooking(${booking.booking_id})">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching bookings:', error);
        });
}

function deleteBooking(bookingId) {
    if (confirm('Are you sure you want to delete this booking?')) {
        fetch(`http://localhost:3000/api/bookings/${bookingId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchBookings(); // Refresh bookings table
            } else {
                alert('Failed to delete booking.');
            }
        })
        .catch(error => {
            console.error('Error deleting booking:', error);
        });
    }
}
