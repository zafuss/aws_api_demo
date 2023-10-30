const dboperations = require('./dboperations');
var db = require('./dboperations');
var User = require('./user');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request, response, next) => {
    console.log('middleware');
    next();
})

router.route('/users').get((request, response) => {
    dboperations.getUsers().then(result => {
        response.json(result[0]);
    })
})

router.route('/users/:username').get((request, response) => {
    dboperations.getUser(request.params.username).then(result => {
        response.json(result[0]);
    })
})

router.route('/users').post((request, response) => {
    let user = {...request.body}

    dboperations.addUser(user).then(result => {
        response.status(201).json(result);
    })
})

var port = process.env.PORT || 80;
app.listen(port);
console.log('User API is running at '+ port);


dboperations.getUsers().then(result => {
    console.log(result);
})