require('dotenv').config();
const express = require('express');

const PORT = 8080;
const LOCALHOST = `http://localhost:${PORT}`;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { connectDB } = require('./src/config/db');
connectDB();

const pong = (req, res, next) => res.status(200).json('Pong!');
app.use('/ping', pong);

const ingredientsRouter = require('./src/api/routes/ingredient.routes');
app.use('/api/v1/ingredients', ingredientsRouter);

const recipesRouter = require('./src/api/routes/recipe.routes');
app.use('/api/v1/recipes', recipesRouter);

const usersRouter = require('./src/api/routes/user.routes');
app.use('/api/v1/users', usersRouter);

app.use('*', async (req, res, next) => res.status(404).json('Route not found'));

app.listen(PORT, () => {
    console.log(`Listening on: ${LOCALHOST}`);
});