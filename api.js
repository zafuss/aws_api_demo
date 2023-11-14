
const userController = require('./controllers/userController.js')
const userRoutes = require('./routes/userRoutes.js');
const priceRoutes = require('./routes/priceRoutes.js')
const customerRoutes = require('./routes/customerRoutes.js')
const branchRoute = require('./routes/branchRoutes.js')
const courtRoute = require('./routes/courtRoutes.js')
const serviceRoute = require('./routes/serviceRoutes.js')
const serviceReceiptRoute = require('./routes/serviceReceiptRoutes.js')
const serviceDetailRoute = require('./routes/serviceDetailRoutes.js')
const rfDetailRoute = require('./routes/rfDetailRoutes.js')
const receiptRoute = require('./routes/receiptRoutes.js')
const reservationRoute = require('./routes/reservationRoutes.js')
const authRoute = require('./routes/authRoute.js')
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
app.use(branchRoute);
app.use(courtRoute);
app.use(serviceRoute);
app.use(serviceReceiptRoute);
app.use(serviceDetailRoute);
app.use(rfDetailRoute);
app.use(receiptRoute);
app.use("/v1/auth", authRoute);
app.get('/', (req, res) => {
    res.send('powered by zafus');
});

// Import the userRoutes and use them in your app
// router.use('/user', userRoutes);

var port = process.env.PORT || 80;
app.listen(port);
console.log('User API is running at ' + port);
console.log('Welcome to zafus\'s API ');

