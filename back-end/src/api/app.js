require('express-async-errors');
const express = require('express');
const cors = require('cors');
const UserRoute = require('./routes/UserRoutes');
const registerRoute = require('./routes/RegisterRoute');
const productRoute = require('./routes/ProductRouter');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/images', express.static('public'));
app.use('/register', registerRoute);
app.use('/login', UserRoute);
app.use('/customer/products', productRoute);

module.exports = app;
