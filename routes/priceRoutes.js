// priceRoutes.js
const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');

router.get('/prices', (request, response) => {
    priceController.getPrices().then(result => {
        response.json(result[0]);
    });
});

router.get('/prices/:PriceID', (request, response) => {
    priceController.getPrice(request.params.PriceID).then(result => {
        if (JSON.stringify(result[0]) === JSON.stringify([])) {
            return response.status(404).json({ message: 'Price not found.' });
        } else {
            return response.json(result[0]);
        }
    });
});

router.put('/prices/:PriceID', (request, response) => {
    let price = { ...request.body };
    let PriceID = request.params.PriceID;
    if (price.Pricename != PriceID) {
        return response.status(404).json({ message: 'Price not found.' });
    }
    priceController.editPrice(price).then(result => response.status(200).json(result));
});

router.put('/prices/status/:PriceID', (request, response) => {
    let PriceID = request.params.PriceID;
    priceController.getPrice(request.params.PriceID).then(result => {
        if (JSON.stringify(result[0]) === JSON.stringify([])) {
            return response.status(404).json({ message: 'Price not found.' });
        } else {
            priceController.enablePrice(PriceID).then(result => response.status(200).json({message: 'Status changed successfully.'}));
        }
    });    
});


router.post('/prices', (request, response) => {
    let price = { ...request.body };

    priceController.addPrice(price).then(result => {
        response.status(201).json(result);
    });
});

module.exports = router;
