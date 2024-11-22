const labels = document.querySelectorAll('.form-control label');
const SigninForm = document.querySelector('#signupForm'); // Updated form ID selector
const errorMessage = document.querySelector('#errorMessage'); // Element for displaying error messages

// Event listener for form submission
SigninForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get input values from the form
    const emailSignin = SigninForm.querySelector('input[name="email"]').value;
    const username = SigninForm.querySelector('input[name="username"]').value;
    const passwordSignin = SigninForm.querySelector('input[name="password"]').value;

    // Create the form data object
    const formSigninData = {
        emailSignin,
        username,
        passwordSignin
    };

    // Send the form data to the server
    fetch('http://localhost:3000/signin-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formSigninData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);

        // Check for error in server response
        if (data.error) {
            // If there's an error, display it in the errorMessage element
            errorMessage.innerText = data.error;
        } else {
            // If no error, handle success case (e.g., redirect or show a success message)
            errorMessage.innerText = ''; // Clear any previous error messages
            alert('User registered successfully!');
        }
    })
    .catch(error => {
        console.error('Error sending data to server:', error);
        errorMessage.innerText = 'An unexpected error occurred. Please try again later.';
    });
});

// Add label animations (your existing code)
labels.forEach(label => {
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('');
});
