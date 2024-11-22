// Retrieve the form element
const loginForm = document.querySelector('form');

// Add an event listener for the form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the input elements for email and password
    const emailInput = loginForm.querySelector('input[type="text"]').value;
    const passwordInput = loginForm.querySelector('input[type="password"]').value;

    // Create an object with the form data
    const formData = {
        emailInput,
        passwordInput
    };

    fetch('http://localhost:3000/login-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
        
        // Handle server response
        const errorMessageElement = document.querySelector('#error-message');

        if (data.error) {
            // Display the error message in red
            errorMessageElement.textContent = data.error;
            errorMessageElement.style.display = 'block';
        } else {
            // Hide the error message
            errorMessageElement.style.display = 'none';
            // Redirect to the products page
            window.location.href = '../tissot_video/test2.html';
        }
    })
    .catch(error => {
        console.error('Error sending data to server:', error);
    });
});

// Animation for the form labels
const labels = document.querySelectorAll('.form-control label');

labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('');
});
