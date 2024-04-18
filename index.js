require('dotenv').config();
const express = require('express');

const PORT = 8080;
const LOCALHOST = `http://localhost:${PORT}`;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const { connectDB } = require('./src/config/db');
connectDB();

const pong = (req, res, next) => res.status(200).json('Pong!');
app.use('/ping', pong);

const mainRouter = require('./src/api/routes/router');
app.use('/api/v1', mainRouter);

app.use('*', async (req, res, next) => res.status(404).json('Route not found'));

app.listen(PORT, () => {
    console.log(`Listening on: ${LOCALHOST}`);
});