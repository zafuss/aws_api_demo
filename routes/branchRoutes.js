// branchRoutes.js
const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

router.get('/branches', (request, response) => {
    branchController.getBranchs().then(result => {
        response.json(result[0]);
    });
});

router.get('/branches/:branchid', (request, response) => {
    branchController.getBranch(request.params.branchid).then(result => {
        if (JSON.stringify(result[0]) === JSON.stringify([])) {
            return response.status(404).json({ message: 'Branch not found.' });
        } else {
            return response.json(result[0]);
        }
    });
});

router.put('/branches/:branchid', (request, response) => {
    let branch = { ...request.body };
    let branchid = request.params.branchid;
    if (branch.Branchname != branchid) {
        return response.status(404).json({ message: 'Branch not found.' });
    }
    branchController.editBranch(branch).then(result => response.status(200).json(result));
});


router.post('/branches', (request, response) => {
    let branch = { ...request.body };

    branchController.addBranch(branch).then(result => {
        response.status(201).json(result);
    });
});

module.exports = router;
