// ServiceDetailRoutes.js
const express = require('express');
const router = express.Router();
const serviceDetailController = require('../controllers/serviceDetailController');

router.get('/servicedetails', (request, response) => {
    serviceDetailController.getServiceDetails().then(result => {
        response.json(result[0]);
    });
});

router.get('/servicedetails/:ServiceReceiptNo', (request, response) => {
    serviceDetailController.getServiceDetail(request.params.ServiceReceiptNo).then(result => {
        if (JSON.stringify(result[0]) === JSON.stringify([])) {
            return response.status(404).json({ message: 'Service Detail not found.' });
        } else {
            return response.json(result[0]);
        }
    });
});

router.put('/servicedetails/:ServiceReceiptNo', (request, response) => {
    let ServiceDetail = { ...request.body };
    let ServiceReceiptNo = request.params.ServiceReceiptNo;
    if (ServiceDetail.ServiceReceiptNo != ServiceReceiptNo) {
        return response.status(404).json({ message: 'Service Detail not found.' });
    }
    serviceDetailController.editServiceDetail(ServiceDetail).then(result => response.status(200).json(result));
});


router.post('/servicedetails', (request, response) => {
    let ServiceDetail = { ...request.body };

    serviceDetailController.addServiceDetail(ServiceDetail).then(result => {
        response.status(201).json(result);
    });
});

module.exports = router;
