// courtRoutes.js
const express = require('express');
const router = express.Router();
const courtController = require('../controllers/courtController');

router.get('/courts', (request, response) => {
    courtController.getCourts().then(result => {
        response.json(result[0]);
    });
});

router.get('/courts/:courtid', (request, response) => {
    courtController.getCourt(request.params.courtid).then(result => {
        if (JSON.stringify(result[0]) === JSON.stringify([])) {
            return response.status(404).json({ message: 'Court not found.' });
        } else {
            return response.json(result[0]);
        }
    });
});

router.put('/courts/:courtid', (request, response) => {
    let court = { ...request.body };
    let courtid = request.params.courtid;
    if (court.Courtname != courtid) {
        return response.status(404).json({ message: 'Court not found.' });
    }
    courtController.editCourt(court).then(result => response.status(200).json(result));
});


router.post('/courts', (request, response) => {
    let court = { ...request.body };

    courtController.addCourt(court).then(result => {
        response.status(201).json(result);
    });
});

module.exports = router;
