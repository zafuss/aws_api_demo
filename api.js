
const userController = require('./controllers/userController.js')
const userRoutes = require('./routes/userRoutes.js');
const priceRoutes = require('./routes/priceRoutes.js')
const customerRoutes = require('./routes/customerRoutes.js')
const reservationRoute = require('./routes/reservationRoutes.js')
const reservationController = require('./controllers/reservationController.js')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(userRoutes);
app.use(customerRoutes);
app.use(priceRoutes);
app.use(reservationRoute);

app.get('/', (req, res) => {
    res.send('powered by zafus');
});

// Import the userRoutes and use them in your app
// router.use('/user', userRoutes);

var port = process.env.PORT || 80;
app.listen(port);
console.log('User API is running at ' + port);
console.log('Welcome to zafus\'s API ');

