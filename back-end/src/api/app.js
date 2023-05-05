require('express-async-errors');
const express = require('express');
const cors = require('cors');
const UserRoute = require('./routes/UserRoutes');
const registerRoute = require('./routes/RegisterRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/register', registerRoute);
app.use('/login', UserRoute);

module.exports = app;
