const Booking = require('../models/booking.model');
const Vehicle = require('../models/vehicle.model');

const { checkValidity } = require('../hepler/booking.helper');

const constants = require('../constants/cab-booking');

exports.createBooking = async(req, res) => {
    try {
        let vehicle = await Vehicle.find({ "vehicle.vin": req.body.vin });
        vehicle = vehicle[0].vehicle;
        const todayDate = new Date();
        const booking = {
            customer: {
                name: req.body.customer.name,
                email: req.body.customer.email,
                phone_number: req.body.customer.phone_number,
                cus_capacity: req.body.customer.cus_capacity
            },
            vehicle: {
                name: vehicle.name,
                capacity: vehicle.capacity,
                date_of_manufacture: vehicle.date_of_manufacture,
                model: vehicle.model,
                vin: vehicle.vin
            },
            booking_date: todayDate
        };

        if (todayDate.getHours() < constants.OPENING_HOUR || todayDate.getHours() > constants.CLOSING_HOUR) {
            res.status(200).json({
                message: "Booking is only open from 9 AM to 5 PM"
            });
        } else if (req.body.customer.cus_capacity > vehicle.capacity) {
            res.status(200).json({
                message: "Booking capacity is " + vehicle.capacity
            });
        } else {
            const booking1 = await Booking.create(booking);
            res.status(201).json(booking1);
        }

    } catch (err) {
        res.status(400).json(err);
    }
}

exports.getBooking = async(req, res) => {
    try {
        const booking = await Booking.find();
        const bookingWithVal = await checkValidity(booking);
        res.status(200).json(bookingWithVal);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.getBookingByVin = async(req, res) => {
    try {
        const booking = await Booking.find({ "vehicle.vin": req.params.vin });
        const bookingWithVal = await checkValidity(booking);
        res.status(200).json(bookingWithVal);
    } catch (err) {
        res.status(404).json(err);
    }
};

exports.getBookingByDate = async(req, res) => {
    try {
        const booking = await Booking.find();
        const bookingbyDate = [];
        booking.map((item) => {
            const data = new Date(item.booking_date);
            if (req.params.date === (data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate())) {
                bookingbyDate.push(item);
            }
        });
        const bookingWithVal = await checkValidity(bookingbyDate);
        res.status(200).json(bookingWithVal);
    } catch (err) {
        res.status(404).json(err);
    }
};