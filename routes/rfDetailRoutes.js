// RFDetailRoutes.js
const express = require('express');
const router = express.Router();
const RFDetailController = require('../controllers/rfDetailController');

router.get('/rfdetails', (request, response) => {
    RFDetailController.getRFDetails().then(result => {
        response.json(result[0]);
    });
});

router.get('/rfdetails/:ReservationNo', (request, response) => {
    RFDetailController.getRFDetail(request.params.ReservationNo).then(result => {
        if (JSON.stringify(result[0]) === JSON.stringify([])) {
            return response.status(404).json({ message: 'RFDetail not found.' });
        } else {
            return response.json(result[0]);
        }
    });
});

router.put('/rfdetails/:ReservationNo', (request, response) => {
    let RFDetail = { ...request.body };
    let ReservationNo = request.params.ReservationNo;
    if (RFDetail.ReservationNo != ReservationNo) {
        return response.status(404).json({ message: 'RFDetail not found.' });
    }
    RFDetailController.editRFDetailNote(RFDetail).then(result => response.status(200).json(result));
});

router.delete('/rfdetails/:ReservationNo/:CourtID', (request, response) => {
    let ReservationNo = request.params.ReservationNo;
    let CourtID = request.params.ReservationNo;
    let RFDetail = {
        ReservationNo : ReservationNo,
        CourtID : CourtID
    }
    if (RFDetail.ReservationNo != ReservationNo) {
        return response.status(404).json({ message: 'RFDetail not found.' });
    }
    RFDetailController.delRFDetail(RFDetail).then(result => response.status(200).json(result));
});


router.post('/rfdetails', (request, response) => {
    let RFDetail = { ...request.body };

    RFDetailController.addRFDetail(RFDetail).then(result => {
        response.status(201).json(result);
    });
});

module.exports = router;
