const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectToMongoDB = async () => {

    // Connection string to atlas
    const mongoUri = 'mongodb+srv://Smayan:Webdev.123@twswebproj.eefdqfm.mongodb.net/twsDataBase?retryWrites=true&w=majority&appName=TWSwebproj'; 

    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err; 
    }
};

module.exports = connectToMongoDB;