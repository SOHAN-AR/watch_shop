const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const connectToMongoDB = require('./database'); // Import the MongoDB connection file
const User = require('./models/user'); // Import the User model
const Checkout = require('./models/checkoutDetails'); // Import the Checkout model

const app = express();
const port = 3000; // You can choose any available port number

// Call the function to connect to MongoDB
connectToMongoDB().catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process if the connection fails
});

//Serve static files from the "webtemp" directory
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile('Home/home.html', { root: '.' });
});
// Parse incoming JSON requests
app.use(express.json());

// POST route to handle checkout page form submissions
app.post('/submit-checkout', async (req, res) => {
    try {
        // Extract checkout data from the request body
        const { fullName, phoneNumber, address, country, city } = req.body;

        // Create a new checkout entry
        const newCheckout = new Checkout({
            fullName,
            phoneNumber,
            address,
            country,
            city,
        });

        // Save the checkout entry to the database
        await newCheckout.save();

        console.log("Checkout data saved to the database:", req.body);

        // Send a success response to the client
        res.json({ message: 'Checkout data saved successfully' });
    } catch (error) {
        console.error('Error saving checkout data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Handling sign in page forms
app.post('/signin-data', async (req, res) => {
    const { emailSignin, username, passwordSignin } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: emailSignin });
    if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(passwordSignin, 10);

    // Create a new user
    const newUser = new User({ email: emailSignin, username, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Handling login page forms
app.post('/login-data', async (req, res) => {
    const { emailInput, passwordInput } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: emailInput });
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare provided password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(passwordInput, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    // User authenticated successfully
    res.json({ message: 'Login successful' });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
