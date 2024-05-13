const mongoose = require("mongoose");
const {
    schema
} = require('../schemas/bookings.schema');
const booking = mongoose.model("booking", schema);

async function create(userID, destination, fullName, persons, start, end, username) {

    return await booking.create({
        userID: userID,
        destinationID: destination,
        fullName: fullName,
        persons: persons,
        startDate: start,
        endDate: end,
        username: username,
    })
}

async function getByID(id) {

    let bookings = await booking.findById(id);
    return bookings;
}

async function getAll() {

    let bookings = await booking.find();
    return bookings;
}

async function update(id, fullName, destination, persons, start, end) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }

    return await booking.findByIdAndUpdate(id, {
        userID: user,
        destinationID: destination,
        fullName: fullName,
        persons: persons,
        startDate: start,
        endDate: end,
    }, {
        new: true
    });
}

async function remove(id) {

    if (mongoose.isValidObjectId(id)) {
        return await booking.findByIdAndDelete(id);
    }

    return null;
}

module.exports.create = create;
module.exports.getByID = getByID;
module.exports.getAll = getAll;
module.exports.update = update;
module.exports.delete = remove;
