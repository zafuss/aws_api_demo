// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', (request, response) => {
    userController.getUsers().then(result => {
        response.json(result[0]);
    });
});

router.get('/users/:username', (request, response) => {
    userController.getUser(request.params.username).then(result => {
        if (JSON.stringify(result[0]) === JSON.stringify([])) {
            return response.status(404).json({ message: 'User not found.' });
        } else {
            return response.json(result[0]);
        }
    });
});

router.put('/users/:username', (request, response) => {
    let user = { ...request.body };
    let username = request.params.username;
    if (user.Username != username) {
        return response.status(404).json({ message: 'User not found.' });
    }
    userController.editUser(user).then(result => response.status(200).json(result));
});

router.put('/users/status/:username', (request, response) => {
    let username = request.params.username;
    if (username == 'admin') {
        return response.status(404).json({ message: 'Admin cannot be disabled.' });
    }
    else
        userController.getUser(request.params.username).then(result => {
            if (JSON.stringify(result[0]) === JSON.stringify([])) {
                return response.status(404).json({ message: 'User not found.' });
            } else {
                userController.changeUserStatus(username).then(result => response.status(200).json({message: 'Status changed successfully.'}));
            }
        });    
});


router.post('/users', (request, response) => {
    let user = { ...request.body };

    userController.addUser(user).then(result => {
        response.status(201).json(result);
    });
});

module.exports = router;
