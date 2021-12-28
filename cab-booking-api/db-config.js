const mongoose = require('mongoose');
const constants = require('./constants/cab-booking');

const url = constants.DATABASE_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const con = mongoose.connection;
con.on('open', () => {
    console.log('Connected to DB...');
});