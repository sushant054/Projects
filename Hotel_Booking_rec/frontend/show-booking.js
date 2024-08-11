document.addEventListener('DOMContentLoaded', () => {
    fetchUserId().then(userId => {
        if (userId) {
            fetchBookings(userId);
        }
    });
});

async function fetchUserId() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/user-id', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.user_id;
    } catch (error) {
        console.error('Error fetching user ID:', error);
    }
}

async function fetchBookings(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/bookings?user_id=${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const bookings = await response.json();
        const tableBody = document.querySelector('#bookingsTable tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        bookings.forEach(booking => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${booking.booking_id}</td>
                <td>${booking.hotel_name}</td>
                <td>${booking.check_in_date}</td>
                <td>${booking.check_out_date}</td>
                <td>${booking.number_of_guests}</td>
                <td>${booking.room_type}</td>
                <td>${booking.payment !== null ? booking.payment : 'N/A'}</td>
                <td>${booking.status}</td>
                <td><button class="delete-btn" onclick="deleteBooking(${booking.booking_id})">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
    }
}

function deleteBooking(bookingId) {
    if (confirm('Are you sure you want to delete this booking?')) {
        fetch(`http://localhost:3000/api/bookings/${bookingId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchUserId().then(userId => {
                    if (userId) {
                        fetchBookings(userId); // Refresh bookings table
                    }
                });
            } else {
                alert('Failed to delete booking.');
            }
        })
        .catch(error => {
            console.error('Error deleting booking:', error);
        });
    }
}
 