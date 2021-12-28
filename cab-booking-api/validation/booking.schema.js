const Joi = require('joi');

const schema = {
    booking: Joi.object({
        vehicle: {
            name: Joi.string().required(),
            model: Joi.string().required(),
            capacity: Joi.number().integer().min(1).max(9).required(),
            date_of_manufacture: Joi.date().required(),
            vin: Joi.string().length(17).pattern(/^[0-9]+$/).required()
        }
    })
}

module.exports = schema;