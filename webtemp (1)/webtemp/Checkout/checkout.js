document.addEventListener("DOMContentLoaded", function() {
    // Handle form submission
    function handleFormSubmission(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Collect form data
        const fullName = document.querySelector('#name').value;
        const phoneNumber = document.querySelector('#phone').value;
        const address = document.querySelector('#address').value;
        const country = document.querySelector('#country').value;
        const city = document.querySelector('#city').value;

        // Create a form data object
        const formData = {
            fullName,
            phoneNumber,
            address,
            country,
            city
        };

        // Send the form data to the server
        fetch('http://localhost:3000/submit-checkout', { // Added absolute URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
            // Handle server response (e.g., display a success message)
        })
        .catch(error => {
            console.error('Error sending data to server:', error);
        });
    }

    // Attach form submission handler to the form
    const form = document.querySelector('#checkoutForm'); // Changed to form ID
    form.addEventListener('submit', handleFormSubmission);
});
