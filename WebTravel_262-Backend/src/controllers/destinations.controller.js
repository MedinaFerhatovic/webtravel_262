const router = require('express').Router();
const destService = require('../services/destinations.service')
const User = require('../schemas/users.schema');

router.post('/destinations', (req, res) => {

    let city = req.body.city
    let country = req.body.country
    let description = req.body.description
    let imageURL = req.body.imageURL
    let review = req.body.review

    let categories = [];
    categories.push(city.trim().toLowerCase(), country.trim().toLowerCase());
    categories.push(...req.body.categories.map(el => {
        return el.trim().toLowerCase();
    }));

    let destinations = destService.create(city, country, description, imageURL, review, categories);

    res.json(destinations);

})

router.get('/destination', async (req, res) => {

    let id = req.query.id;

    let destination = await destService.getByID(id);
    res.json(destination);
});

router.get('/destinations', async (req, res) => {

    let destinations = await destService.getAll();

    res.json(destinations);
});

router.put("/destination/", async (req, res) => {

    let id = req.query.id

    let city = req.body.city
    let country = req.body.country
    let description = req.body.description
    let imageURL = req.body.imageURL
    let review = req.body.review
    let categories = req.body.categories

    destination = destService.update(id, city, country, description, imageURL, review, categories);
    res.json(destination);
});

router.delete('/destination/', async (req, res) => {

    let id = req.query.id;
    console.log(id)

    let destination = await destService.delete(id);
    if (destination == undefined) {
        res.json(null);
    } else {
        res.json(destination);
    }


})


router.post('/destination/comment', async (req, res) => {
    const { destinationId, userId, message } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Korisnik nije pronađen.' });
        }

        const comment = { user: userId, username: user.username, message }; 

        const updatedDestination = await destService.addComment(destinationId, comment);
        res.json(updatedDestination);
    } catch (error) {
        console.error('Greška prilikom dodavanja komentara:', error);
        res.status(500).json({ message: 'Greška prilikom dodavanja komentara', error });
    }
});

router.delete("/destination/comment", async (req, res) => {
    const { destinationId, commentId } = req.body;
    try {
        await destService.deleteComment(destinationId, commentId);
        res.status(200).json({ message: 'Komentar uspješno obrisan.' });
    } catch (error) {
        res.status(500).json({ message: 'Greška prilikom brisanja komentara.', error });
    }
});

module.exports.controller = router;