const router = require('express').Router();
const bookingService = require('../services/bookings.service');

router.post('/bookings', (req, res) => {
    let userID = req.body.userID;
    let destinationID = req.body.destinationID;
    let fullName = req.body.fullName;
    let persons = req.body.persons;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let username = req.body.username; 

    let booking = bookingService.create(userID, destinationID, fullName, persons, startDate, endDate, username);
    res.json(booking);
});

router.get('/bookings/user', async (req, res) => {
    let userID = req.query.userID;
    let bookings = await bookingService.getByID(userID);
    res.json(bookings);
});

router.get('/bookings', async (req, res) => {

    let bookings = await bookingService.getAll();

    res.json(bookings);
});

router.put('/booking/', async (req, res) => {

    let id = req.query.id;

    let userID = req.body.userID;
    let destinationID = req.body.destinationID
    let fullName = req.body.fullName;
    let persons = req.body.persons;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;

    let booking = bookingService.update(id, userID, destinationID, fullName, persons, startDate, endDate);

    res.json(booking);
});

router.delete('/booking/', async (req, res) => {

    let id = req.query.id;

    let booking = await bookingService.delete(id)
    if (booking == undefined) {
        res.json(null)
    } else {
        res.json(booking)
    }
})

router.put('/user/status/:id', async (req, res) => {
    let id = req.params.id;
    let active = req.body.active;

    let user = await userService.changeUserStatus(id, active);
    if (user === null) {
        res.status(404).json({ message: "Korisnik nije pronađen." });
    } else {
        res.json(user);
    }
});

module.exports.controller = router;