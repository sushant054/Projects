document.getElementById('forgotPasswordForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;

    try {
        const response = await fetch('http://localhost:3000/v1/verify-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });

        const result = await response.json();

        if (response.ok) {
            // Show the update password form
            document.getElementById('updatePasswordContainer').style.display = 'block';
            document.getElementById('usernameForUpdate').value = username;
            document.getElementById('message').textContent = 'You can now update your password.';
            document.getElementById('error').textContent = '';
        } else {
            document.getElementById('error').textContent = result.error;
            document.getElementById('message').textContent = '';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error').textContent = 'An error occurred. Please try again later.';
        document.getElementById('message').textContent = '';
    }
});

document.getElementById('updatePasswordForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        username: document.getElementById('usernameForUpdate').value,
        newPassword: document.getElementById('newPassword').value
    };

    try {
        const response = await fetch('http://localhost:3000/v1/update-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('updateMessage').textContent = 'Password updated successfully!';
            document.getElementById('updateError').textContent = '';
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            document.getElementById('updateError').textContent = result.error;
            document.getElementById('updateMessage').textContent = '';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('updateError').textContent = 'An error occurred. Please try again later.';
        document.getElementById('updateMessage').textContent = '';
    }
});
