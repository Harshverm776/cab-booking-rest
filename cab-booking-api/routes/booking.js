const express = require('express');
const router = express.Router();
const { createBooking, getBooking, getBookingByVin, getBookingByDate } = require('../controllers/booking.controller');

router.post('/', createBooking);
router.get('/', getBooking);
router.get('/vin/:vin', getBookingByVin);
router.get('/date/:date', getBookingByDate);

module.exports = router;