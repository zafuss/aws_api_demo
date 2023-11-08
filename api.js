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
        if (JSON.stringify(result[0]) === JSON.stringify([]))     
            return response.status(404).json({message: 'User not found.'});        
        else 
            return response.json(result[0]);
    })
})

router.route('/users/:username').put((request, response) => {
    let user = {...request.body}
    let username = request.params.username;
    if (user.Username != username) 
        return response.status(404).json({ message: 'User not found.' });
    dboperations.editUser(user).then(result => response.status(200).json(result));
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

