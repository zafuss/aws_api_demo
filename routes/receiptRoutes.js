// ReceiptRoutes.js
const express = require('express');
const router = express.Router();
const ReceiptController = require('../controllers/receiptController');

router.get('/receipts', (request, response) => {
    ReceiptController.getReceipts().then(result => {
        response.json(result[0]);
    });
});

router.get('/receipts/:ReceiptNo', (request, response) => {
    ReceiptController.getReceipt(request.params.ReceiptNo).then(result => {
        if (JSON.stringify(result[0]) === JSON.stringify([])) {
            return response.status(404).json({ message: 'Receipt not found.' });
        } else {
            return response.json(result[0]);
        }
    });
});

router.put('/receipts/:ReceiptNo', (request, response) => {
    let Receipt = { ...request.body };
    let ReceiptNo = request.params.ReceiptNo;
    if (Receipt.ReceiptNo != ReceiptNo) {
        return response.status(404).json({ message: 'Receipt not found.' });
    }
    ReceiptController.editReceipt(Receipt).then(result => response.status(200).json(result));
});


router.post('/receipts', (request, response) => {
    let Receipt = { ...request.body };

    ReceiptController.addReceipt(Receipt).then(result => {
        response.status(201).json(result);
    });
});

module.exports = router;
