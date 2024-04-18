const express = require('express');
const usersRouter = express.Router();
const { isAdmin } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const { getUsers, registerNewUser, login, updateUser, deleteUser } = require('../controllers/user');

usersRouter.get('/', isAdmin, getUsers);

usersRouter.post('/register', upload.single('profileImage'), registerNewUser);
usersRouter.post('/login', login);

usersRouter.put('/:id', isAdmin, upload.single('profileImage'), updateUser);

usersRouter.delete('/:id', isAdmin, deleteUser);

module.exports = usersRouter;