const mongoose = require('mongoose');

let schema = mongoose.Schema({
    city: String,
    country: String,
    description: String,
    imageURL: String,
    review: Number,
    categories: [String],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        },
        message: String,
        date: { type: Date, default: Date.now }
    }]
});


module.exports.schema = schema;

