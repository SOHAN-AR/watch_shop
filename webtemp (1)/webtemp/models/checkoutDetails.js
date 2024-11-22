const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
});

const Checkout = mongoose.model('Checkout', checkoutSchema, 'CheckoutDetails');
module.exports = Checkout;
