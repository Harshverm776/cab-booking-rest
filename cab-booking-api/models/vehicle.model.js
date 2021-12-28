const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    vehicle: {
        name: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        date_of_manufacture: {
            type: Date,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        vin: {
            type: String,
            required: true,
            unique: true
        }
    }
});

module.exports = mongoose.model('vehicle', vehicleSchema);