require('dotenv').config();
const connection = require('./connection');
let objectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validator = require('../validator/validator.js');

const dbName = process.env.DB_name; //cambiar


//Busco mensajes por user y nanny
async function getMessages(_userId, _nannyId) {
    const clienteMongo = await connection.getConnection();
    let messages = null;
    if (_userId != undefined && _nannyId != undefined) {
        messages = await clienteMongo.db(dbName).collection('messages').find(
            {
                userId: _userId,
                nannyId: _nannyId
            }).sort({ date: 1 })
            .toArray();
    } else {
        let mensaje = message.userId ? "Falta usuario nanny en el mensaje" : "falta el usuario en el mensaje"
        console.log(mensaje)
    }
    return messages;
}

//trae mensaje por id. Ver para que serviria-.
async function getMessage(id) {
    const clienteMongo = await connection.getConnection();
    let message = null;
    try {
        message = await clienteMongo.db(dbName).collection('messages')
            .findOne({ _id: new objectId(id) });
    } catch (error) {
        console.log("El mensaje no fue encontrado")
    }
    return message;
}

//Agregar mensajes
async function addMessage(message) {
    const clienteMongo = await connection.getConnection();
    let agregar = null;
    validator.checkId(message.userId);
    validator.checkId(message.nannyId);
    let userIdCorrecto = await clienteMongo.db(dbName).collection('usuarios').findOne({_id: new objectId(message.userId)});
    let nannyIdCorrecto = await clienteMongo.db(dbName).collection('nannys').findOne({_id: new objectId(message.nannyId)});
    if (userIdCorrecto == null ||nannyIdCorrecto == null){
        throw new Error("id incorrecto.")
    }
    message.date = Date();
    agregar = await clienteMongo.db(dbName).collection('messages').insertOne(message);
    return agregar;
}

//Borrar mensaje por id del mensaje
async function deleteMessage(id) {
    const clienteMongo = await connection.getConnection();
    const borrar = await clienteMongo.db(dbName).collection('messages').deleteOne({ _id: new objectId(id) });
    return borrar;
}


module.exports = {
    getMessages, getMessage, addMessage, deleteMessage
};