document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://localhost:3000/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            // Successful login
            alert('Login successful!');
            window.location.href = '/dashboard.html'; // Redirect to a dashboard or another page
        } else {
            // Show error message
            document.getElementById('error').textContent = result.error;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error').textContent = 'An error occurred. Please try again later.';
    }
});
