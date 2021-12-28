const constants = require('../constants/cab-booking');

exports.checkValidity = async(booking) => {
    const bookingWithVal = [];
    booking.map((item) => {
        const currentDate = new Date();
        const booking_date = new Date(item.booking_date);
        const timeDifference = Math.abs(booking_date.getTime() - currentDate.getTime());
        if (timeDifference > constants.BOOKING_VALIDITY) {
            item.is_active = false;
            // item.save();
        }
        bookingWithVal.push(item);
    });
    return bookingWithVal;
}