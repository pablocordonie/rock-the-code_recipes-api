require('dotenv').config();
const express = require('express');

const PORT = 8080;
const LOCALHOST = `http://localhost:${PORT}`;

const app = express();

const { connectDB } = require('./src/config/db');
connectDB();

const pong = (req, res, next) => res.status(200).json('Pong!');
app.use('/ping', pong);

app.use('*', async (req, res, next) => res.status(404).json('Route not found'));

app.listen(PORT, () => {
    console.log(`Listening on: ${LOCALHOST}`);
});