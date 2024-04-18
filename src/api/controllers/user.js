const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateSign } = require('../../config/jwt');
const { deleteFile } = require('../../utils/deleteFile');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).json('No se ha encontrado la lista de usuarios');
    }
};

const registerNewUser = async (req, res, next) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            birthyear: req.body.birthyear,
            role: 'user',
            profileImage: req.body.profileImage
        });

        if (req.file) {
            newUser.profileImage = req.file.path;
        }

        const savedNewUser = await newUser.save();
        return res.status(201).json(savedNewUser);
    } catch (err) {
        return res.status(400).json('Los datos proporcionados no son válidos');
    }
};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).json('El usuario no existe');
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = generateSign(user._id);
            return res.status(200).json({ user, token });
        } else {
            return res.status(400).json('La contraseña no es correcta');
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json('Los datos proporcionados no son válidos');
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const newUser = new User(req.body);
        newUser._id = id;

        if (req.file) {
            newUser.profileImage = req.file.path;
            const oldUser = await User.findById(id);
            deleteFile(oldUser.profileImage);
        }

        const updatedUser = await User.findByIdAndUpdate(id, newUser, { new: true });
        return res.status(201).json(updatedUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Los datos proporcionados no son válidos');
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        deleteFile(deletedUser.profileImage);
        return res.status(200).json(deletedUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json('No ha sido posible eliminar a este usuario');
    }
};

module.exports = { getUsers, registerNewUser, login, updateUser, deleteUser };