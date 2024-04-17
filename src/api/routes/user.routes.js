const express = require('express');
const usersRouter = express.Router();
const { isAdmin } = require('../../middlewares/auth');
const { getUsers, registerNewUser, login, updateUser, deleteUser } = require('../controllers/user');

usersRouter.get('/', isAdmin, getUsers);

usersRouter.post('/register', registerNewUser);
usersRouter.post('/login', login);

usersRouter.put('/:id', isAdmin, updateUser);

usersRouter.delete('/:id', isAdmin, deleteUser);

module.exports = usersRouter;