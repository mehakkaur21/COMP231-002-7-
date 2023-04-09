const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    locationType: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    bookingDate: {
        type: String,
        required: true
    },
    startingTime: {
        type: String,
        required: true
    },
    desiredService: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }, dateOfBooking: {
        type: String,
        required: true
    },
    timeOfBooking: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Booking', bookingSchema);