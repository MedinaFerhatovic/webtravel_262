const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    status: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
