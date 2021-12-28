const { booking } = require("./booking.schema");

module.exports = {
    bookingValidation: async(req, res, next) => {
        const value = booking.validate(req.body);
        if (value.error) {
            res.status(400).json({
                success: 0,
                message: value.error.details[0].message
            });
        } else {
            next();
        }
    }
};