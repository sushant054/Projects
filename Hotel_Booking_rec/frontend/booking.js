document.addEventListener('DOMContentLoaded', function() {
    // Function to get the user ID from the server
    async function getUserId() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/user-id', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 403) {
                throw new Error('Forbidden: Access is denied.');
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.user_id) {
                document.getElementById('user_id').value = data.user_id;
            } else {
                console.error('No user ID returned');
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    }

    // Function to get the query parameter from the URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const hotelName = getQueryParam('hotel_name');
    if (hotelName) {
        document.getElementById('hotel_name').value = hotelName;
    }

    const form = document.getElementById('booking-form');
    const saveButton = document.getElementById('save-button');
    const completeButton = document.getElementById('complete-button');

    // Function to gather form data and add status
    function gatherFormData(status) {
        const formData = new FormData(form);
        return {
            user_id: formData.get('user_id'),
            hotel_name: formData.get('hotel_name'),
            check_in: formData.get('check_in'),
            check_out: formData.get('check_out'),
            guest: formData.get('guest'),
            room_type: formData.get('room_type'),
            payment: formData.get('payment') || null,
            status: status
        };
    }

    // Function to handle form submission
    function handleFormSubmission(status) {
        const data = gatherFormData(status);

        if (!data.user_id || !data.hotel_name || !data.check_in || !data.check_out || !data.guest || !data.room_type) {
            alert('Please fill in all required fields.');
            return;
        }

        fetch('http://localhost:3000/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log('Response Status:', response.status);

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                return response.text();
            }
        })
        .then(responseData => {
            if (typeof responseData === 'string') {
                console.log('Response Text:', responseData);
            } else {
                console.log('Success:', responseData);
            }
            alert(status === 'complete' ? 'Booking completed successfully' : 'Booking saved as draft successfully');
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error processing booking. Please try again.');
        });
    }

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (event.submitter && event.submitter.id === 'save-button') {
            handleFormSubmission('draft');
        } else if (event.submitter && event.submitter.id === 'complete-button') {
            handleFormSubmission('complete');
        }
    });

    // Fetch user ID on page load
    getUserId();
});
