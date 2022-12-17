require('dotenv').config();
const connection = require('./connection');
let objectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');//revisar

const dbName = process.env.DB_name; //cambiar

async function getNannys() {
    const clienteMongo = await connection.getConnection();

    const nannys = await clienteMongo.db(dbName).collection('nannys').find()
        .toArray();
    return nannys;
}

async function getNanny(id) {
    const clienteMongo = await connection.getConnection();
    const usuario = await clienteMongo.db(dbName).collection('nannys')
        .findOne({ _id: new objectId(id) });
    return usuario;
}

async function addNanny(nanny) {
    const clienteMongo = await connection.getConnection();
    nanny.password = bcrypt.hashSync(nanny.password, 8);

    const agregar = await clienteMongo.db(dbName).collection('nannys')
        .insertOne(nanny);
    return agregar;
}

async function findByCredentials(email, password) {
    const clienteMongo = await connection.getConnection();
    console.log(email);
    const user = await clienteMongo.db(dbName)
        .collection('nannys')
        .findOne({ mail: email });
    console.log(user);
    if (!user) {
        throw new Error('Usuario inexistente');
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        throw new Error('Password invalida');
    }

    return user;
}

async function generateJWT(user) {
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET, { expiresIn: '1h' });
    return token;
}

async function updateNanny(nanny) {
    const clienteMongo = await connection.getConnection();
    const query = { _id: new objectId(nanny._id) };
    const newvalues = {
        $set: {
            nombre: nanny.nombre,
            apellido: nanny.apellido,
            // fecha_nacimiento: usuario.fecha_nacimiento,
            // mail: usuario.mail,
            // password: usuario.password
        }
    };
    const actualizar = await clienteMongo.db(dbName).collection('nannys')
        .updateOne(query, newvalues);
    return actualizar;
}

async function deleteNanny(id) {
    const clienteMongo = await connection.getConnection();
    const borrar = await clienteMongo.db(dbName).collection('nannys').deleteOne({ _id: new objectId(id) });
    return borrar;
}

//acaaaaaaaaaaaaaaaaaaaaaaaaaaa verrrr 

async function agregarFavoritos(id, vuelo) {
    const clienteMongo = await connection.getConnection();
    const query = { _id: new objectId(id) };
    const newvalues = { $push: { "favoritos": vuelo } };
    const resultado = await clienteMongo.db(dbName).collection('nannys')
        .updateOne(query, newvalues);
    return resultado;
}

async function borrarFavoritos(id,vueloId){
    const clienteMongo = await connection.getConnection();
    const query = { _id: new objectId(id) };
    const newvalues = { $pull: { "favoritos": { "Vuelo_id": parseInt(vueloId) } } };
    const resultado = await clienteMongo.db(dbName).collection('nannys')
        .updateOne(query, newvalues);
    return resultado;
}




module.exports = { getUsuarios, getUsuario, addUsuario, updateUsuario, deleteUsuario, findByCredentials, generateJWT
    ,agregarFavoritos ,borrarFavoritos };