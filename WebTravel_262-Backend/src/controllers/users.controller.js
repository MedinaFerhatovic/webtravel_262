const router = require('express').Router();
const userService = require('../services/users.service');

router.post('/users', (req, res) => {

    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let username = req.body.username
    let password = req.body.password

    let users = userService.create(firstName, lastName, username, password);

    res.json(users);

})

router.get('/user', async (req, res) => {

    let id = req.query.id;

    let user = await userService.getByID(id);
    res.json(user);
});

router.get('/users', async (req, res) => {

    let users = await userService.getAll();

    res.json(users);
});

router.put('/user/', async (req, res) => {

    let id = req.query.id

    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let username = req.body.username

    user = userService.update(id, firstName, lastName, username)
    res.json(user)
})

router.delete('/user/', async (req, res) => {

    let id = req.query.id;

    let user = await userService.delete(id)
    if (user == undefined) {
        res.json(null)
    } else {
        res.json(user)
    }
})

router.post("/user/login", async (req, res) => {

    let user = await userService.loginUser(req.body.username,req.body.password);
    if(user == undefined){
        res.json(null);
    }else{
        res.json(user);

    }
})

router.put('/user/changeStatus', async (req, res) => {
    let id = req.query.id;
    let isActive = req.body.isActive;

    let updatedUser = await userService.changeUserStatus(id, isActive);

    if (!updatedUser) {
        res.status(404).json({ message: 'Korisnik nije pronađen!' });
    } else {
        res.json(updatedUser);
    }
});

module.exports.controller = router;