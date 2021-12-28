const express = require('express');
const constants = require('./constants/cab-booking')
const db = require('./db-config');

const app = express();
app.disable('x-powered-by');
app.use(express.json());

const vehicleRouter = require('./routes/vehicle');
app.use('/vehicle', vehicleRouter);

const bookingRouter = require('./routes/booking');
app.use('/booking', bookingRouter);

app.listen(constants.PORT, () => {
    console.log('Server Started...');
});