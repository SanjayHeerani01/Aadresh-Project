/**
 * Sindh Shaadi Palace - Admin Login JavaScript
 * Pakistani Wedding Hall Booking System
 */

document.addEventListener('DOMContentLoaded', function() {
    // Login Form Elements
    const loginForm = document.getElementById('login-form');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const passwordToggle = document.getElementById('password-toggle');
    const loginAlert = document.getElementById('login-alert');
    
    // Dummy credentials (in a real application, this would be handled server-side)
    const validCredentials = {
        'admin': 'admin123',
        'manager': 'manager123',
        'staff': 'staff123'
    };
    
    // Show/hide password
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            
            // Toggle eye icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputUsername = username.value.trim();
            const inputPassword = password.value;
            
            // Clear previous alerts
            loginAlert.classList.remove('show');
            
            // Validate required fields
            if (!inputUsername || !inputPassword) {
                showLoginAlert('Please enter both username and password.');
                return;
            }
            
            // Check credentials (client-side validation for demo purposes only)
            if (validCredentials[inputUsername] && validCredentials[inputUsername] === inputPassword) {
                // Successful login
                showLoginAlert('Login successful! Redirecting...', 'success');
                
                // Redirect to dashboard
                setTimeout(function() {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                // Failed login
                showLoginAlert('Invalid username or password. Please try again.');
                
                // Clear password field
                password.value = '';
            }
        });
    }
    
    // Display login alert
    function showLoginAlert(message, type = 'error') {
        if (loginAlert) {
            loginAlert.textContent = message;
            loginAlert.classList.add('show');
            
            if (type === 'success') {
                loginAlert.style.backgroundColor = 'var(--success-light)';
                loginAlert.style.color = 'var(--success-dark)';
            } else {
                loginAlert.style.backgroundColor = 'var(--error-light)';
                loginAlert.style.color = 'var(--error-dark)';
            }
        }
    }
});