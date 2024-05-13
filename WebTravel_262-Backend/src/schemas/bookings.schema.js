const mongoose = require('mongoose');

let schema = mongoose.Schema({
    userID: String,
    destinationID: String,
    username: String,
    fullName: String,
    persons: Number,
    startDate: String,
    endDate: String,
});

module.exports.schema = schema;
