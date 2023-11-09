// customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/customers', (request, response) => {
    customerController.getCustomers().then(result => {
        response.json(result[0]);
    });
});

router.get('/customers/:phonenumber', (request, response) => {
    customerController.getCustomer(request.params.phonenumber).then(result => {
        if (JSON.stringify(result[0]) === JSON.stringify([])) {
            return response.status(404).json({ message: 'Customer not found.' });
        } else {
            return response.json(result[0]);
        }
    });
});

router.put('/customers/:phonenumber', (request, response) => {
    let customer = { ...request.body };
    let phonenumber = request.params.phonenumber;
    if (customer.PhoneNumber != phonenumber) {
        return response.status(404).json({ message: 'Customer not found.' });
    }
    customerController.editCustomer(customer).then(result => response.status(200).json(result));
});

router.post('/customers', (request, response) => {
    let customer = { ...request.body };

    customerController.addCustomer(customer).then(result => {
        response.status(201).json(result);
    });
});

module.exports = router;
