// reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/reservations', (request, response) => {
    reservationController.getReservations().then(result => {
        response.json(result[0]);
    });
});

router.get('/reservations/:ReservationNo', (request, response) => {
    reservationController.getReservation(request.params.ReservationNo).then(result => {
        if (JSON.stringify(result[0]) === JSON.stringify([])) {
            return response.status(404).json({ message: 'Reservation not found.' });
        } else {
            return response.json(result[0]);
        }
    });
});

router.put('/reservations/:ReservationNo', (request, response) => {
    let reservation = { ...request.body };
    let ReservationNo = request.params.ReservationNo;
    if (reservation.ReservationNo != ReservationNo) {
        return response.status(404).json({ message: 'Reservation not found.' });
    }
    reservationController.editReservation(reservation).then(result => response.status(200).json(result));
});

router.post('/reservations', (request, response) => {
    let reservation = { ...request.body };

    reservationController.addReservation(reservation).then(result => {
        response.status(201).json(request.body.ReservationNo);
    });
});

router.delete('/reservations/:ReservationNo', (request, response) => {
    let ReservationNo = request.params.ReservationNo;
    reservationController.deleteReservation(ReservationNo).then(result => response.status(200).json(result));
});

module.exports = router;
