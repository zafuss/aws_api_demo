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
app.use('/', router);

app.get('/', (req, res) => {
    res.send('powered by zafus');
  });
  

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

router.route('users/:username').put((request, response) => {
    let user = {...request.body}
    let username = request.params.username;

    dboperations.editUser(user, username).then(result => response.status(200).json(result));
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


let user =     {
    "Username": "admin",
    "_Password": "CinA5MJWDvBTvOJSvluE4g==",
    "_Name": "adminnnnn",
    "_Role": "Admin",
    "Email": "todreamscompany@gmail.com",
    "PhoneNumber": "0823216213",
    "_Status": "Enabled"
}

dboperations.editUser(user, "admin").then(result => {
    console.log(result);
})