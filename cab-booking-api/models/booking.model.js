const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customer: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone_number: {
            type: Number,
            required: true
        },
        cus_capacity: {
            type: Number,
            required: true
        }
    },
    vehicle: {
        name: {
            type: String
        },
        capacity: {
            type: Number
        },
        date_of_manufacture: {
            type: Date
        },
        model: {
            type: String
        },
        vin: {
            type: String,
            required: true
        }
    },
    booking_date: {
        type: Date
    },
    is_active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('booking', bookingSchema);