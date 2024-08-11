document.addEventListener('DOMContentLoaded', function() {
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

        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        // Basic validation for password
        const passwordError = validatePassword(newPassword, confirmNewPassword);
        if (passwordError) {
            document.getElementById('updateError').textContent = passwordError;
            document.getElementById('updateMessage').textContent = '';
            return;
        }

        const formData = {
            username: document.getElementById('usernameForUpdate').value,
            newPassword
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

    function validatePassword(password, confirmPassword) {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (!/[0-9]/.test(password)) {
            return 'Password must contain at least one number.';
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return 'Password must contain at least one special character.';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }
        return null;
    }
});
