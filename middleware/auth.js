require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    try {
        //sacamos el Bearer de la request.
        if (!req.header('Authorization')) {
            throw new Error('Token invalido');
        }
        const token = req.header('Authorization').split(' ')[1];
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        res.status(401).send(error.message);
        //401 = Desautorizado
    }
}

module.exports = auth;