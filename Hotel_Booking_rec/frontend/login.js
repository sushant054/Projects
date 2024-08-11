document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form'); // Adjusted to match HTML

    if (!form) {
        console.error('Login form not found');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:3000/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token); // Store token in local storage
                // Optionally, redirect the user to another page
                window.location.href = './dashboard.html'; // Example redirect
            } else {
                // Handle errors
                document.getElementById('error').textContent = data.error || 'Login failed';
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            document.getElementById('error').textContent = 'An error occurred. Please try again.';
        });
    });
});
