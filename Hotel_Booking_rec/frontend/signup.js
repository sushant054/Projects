document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        Name: document.getElementById('name').value,
        UserName: document.getElementById('username').value,
        Password: document.getElementById('password').value,
        PhoneNumber: document.getElementById('phoneNumber').value,
        Email: document.getElementById('email').value
    };

    try {
        const response = await fetch('http://localhost:3000/v1/signup', {  // Adjusted URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            // Registration successful
            alert('Registration successful!');
            window.location.href = './frontend/login.html';
        } else {
            // Show error message
            document.getElementById('error').textContent = result.error;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error').textContent = 'An error occurred. Please try again later.';
    }
});




