const express = require('express');
const router = express.Router();
const { createVehicle, getVehicle } = require('../controllers/vehicle.controller');
const { bookingValidation } = require('../validation/booking.validation');

router.post('/', bookingValidation, createVehicle);
router.get('/', getVehicle);

module.exports = router;