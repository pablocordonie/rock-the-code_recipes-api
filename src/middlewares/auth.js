const User = require('../api/models/User');
const { verifyJwt } = require('../config/jwt');

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const parsedToken = token.replace('Bearer ', '');

        const { id } = verifyJwt(parsedToken);

        const user = await User.findById(id);

        user.password = null;
        req.user = user;
        next();
    } catch (err) {
        return res.status(400).json('No estás autorizado a realizar esta petición');
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const parsedToken = token.replace('Bearer ', '');

        const { id } = verifyJwt(parsedToken);

        const user = await User.findById(id);

        if (user.role === 'admin') {
            user.password = null;
            req.user = user;
            next();
        } else {
            return res.status(400).json('Esta acción sólo la puede realizar el administrador');
        }
    } catch (err) {
        return res.status(400).json('No estás autorizado a realizar esta petición');
    }
};

module.exports = { isAuth, isAdmin };