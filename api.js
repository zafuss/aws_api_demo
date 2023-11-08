
const userController = require('./controllers/userController.js')
const userRoutes = require('./routes/userRoutes.js');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(userRoutes);

app.get('/', (req, res) => {
    res.send('powered by zafus');
});

// Import the userRoutes and use them in your app
// router.use('/user', userRoutes);

var port = process.env.PORT || 80;
app.listen(port);
console.log('User API is running at ' + port);

userController.getUsers().then(result => {
    console.log(result);
});