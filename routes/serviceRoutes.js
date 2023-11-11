// serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/services', (request, response) => {
    serviceController.getServices().then(result => {
        response.json(result[0]);
    });
});

router.get('/services/:serviceid', (request, response) => {
    serviceController.getService(request.params.serviceid).then(result => {
        if (JSON.stringify(result[0]) === JSON.stringify([])) {
            return response.status(404).json({ message: 'Service not found.' });
        } else {
            return response.json(result[0]);
        }
    });
});

router.put('/services/:serviceid', (request, response) => {
    let service = { ...request.body };
    let serviceid = request.params.serviceid;
    if (service.ServiceID != serviceid) {
        return response.status(404).json({ message: 'Service not found.' });
    }
    serviceController.editService(service).then(result => response.status(200).json(result));
});


router.put('/services/:serviceid/:quantity', (request, response) => {
   
    let serviceid = request.params.serviceid;
    let quantity = request.params.quantity;
 
    serviceController.changeServiceQuantity(serviceid, quantity).then(result => response.status(200).json(result));
});


router.post('/services', (request, response) => {
    let service = { ...request.body };

    serviceController.addService(service).then(result => {
        response.status(201).json(result);
    });
});

module.exports = router;
