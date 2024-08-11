document.addEventListener('DOMContentLoaded', function() {
    // Get the query parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const hotelName = urlParams.get('hotel_name');

    // If hotelName is present in the query string, set it in the input field
    const hotelNameInput = document.getElementById('hotel_name');
    if (hotelNameInput && hotelName) {
        hotelNameInput.value = decodeURIComponent(hotelName);
    }

    const form = document.getElementById('booking-form');
    const saveButton = document.getElementById('save-button');
    const completeButton = document.getElementById('Complete');

    function gatherFormData(status) {
        const formData = new FormData(form);
        return {
            hotel_name: formData.get('hotel_name'),
            check_in: formData.get('check_in'),
            check_out: formData.get('check_out'),
            guest: formData.get('guest'),
            room_type: formData.get('room_type'),
            payment: formData.get('payment') || null, // Optional field
            status: status // Set status from the function parameter
        };
    }

    function handleFormSubmission(status) {
        const data = gatherFormData(status);

        // Ensure all required fields are provided
        if (!data.hotel_name || !data.check_in || !data.check_out || !data.guest || !data.room_type) {
            alert('Please fill in all required fields.');
            return;
        }

        fetch('http://localhost:3000/api/update-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert(status === 'complete' ? 'Booking completed successfully' : 'Booking saved as draft successfully');
            form.reset(); // Optionally reset the form
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error processing booking. Please try again.');
        });
    }

    // Handle save booking
    saveButton.addEventListener('click', function() {
        handleFormSubmission('draft'); // Set status as draft
    });

    // Handle complete booking
    completeButton.addEventListener('click', function() {
        handleFormSubmission('complete'); // Set status as complete
    });
});
