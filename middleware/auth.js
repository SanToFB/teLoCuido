require('dotenv').config();
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    try {
        const token = req.header('Token');
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        res.status(401).send({error: error.message});
        //401 = Desautorizado
    }
}

module.exports = auth;