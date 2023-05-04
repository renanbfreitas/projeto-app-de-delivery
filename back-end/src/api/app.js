require('express-async-errors');
const express = require('express');
const cors = require('cors');

const handleError = require('../middlewares/HandleError');
const route = require('../routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(route);
app.get('/coffee', (_req, res) => res.status(418).end());

app.use(handleError);

module.exports = app;
