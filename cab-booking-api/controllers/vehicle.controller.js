const Vehicle = require('../models/vehicle.model');

exports.createVehicle = async(req, res) => {
    try {
        const vehicle1 = await Vehicle.create(req.body);
        res.status(201).json(vehicle1);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.getVehicle = async(req, res) => {
    try {
        const vehicle = await Vehicle.find();
        res.status(200).json(vehicle);
    } catch (err) {
        res.status(404).json(err);
    }
};