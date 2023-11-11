// servicereceiptRoutes.js
const express = require('express');
const router = express.Router();
const serviceReceiptController = require('../controllers/serviceReceiptController');

router.get('/servicereceipts', (request, response) => {
    serviceReceiptController.getServiceReceipts().then(result => {
        response.json(result[0]);
    });
});

router.get('/servicereceipts/:ServiceReceiptNo', (request, response) => {
    serviceReceiptController.getServiceReceipt(request.params.ServiceReceiptNo).then(result => {
        if (JSON.stringify(result[0]) === JSON.stringify([])) {
            return response.status(404).json({ message: 'Service Receipt not found.' });
        } else {
            return response.json(result[0]);
        }
    });
});

router.put('/servicereceipts/:ServiceReceiptNo', (request, response) => {
    let servicereceipt = { ...request.body };
    let servicereceiptid = request.params.servicereceiptid;
    if (servicereceipt.ServiceReceiptNo != ServiceReceiptNo) {
        return response.status(404).json({ message: 'Service Receipt not found.' });
    }
    serviceReceiptController.editServiceReceipt(servicereceipt).then(result => response.status(200).json(result));
});


router.post('/servicereceipts', (request, response) => {
    let servicereceipt = { ...request.body };

    serviceReceiptController.addServiceReceipt(servicereceipt).then(result => {
        response.status(201).json(result);
    });
});

module.exports = router;
