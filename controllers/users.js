require('dotenv').config();
const connection = require('./connection');
let objectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('../validator/validator')

const dbName = process.env.DB_name; //teLoCuido

async function getUsuarios(esNanny) {
    const clienteMongo = await connection.getConnection();
    let usuarios = null;
    try {
        if (esNanny) {
            usuarios = await clienteMongo.db(dbName).collection('nannys').find()
                .toArray();
        } else {
            usuarios = await clienteMongo.db(dbName).collection('usuarios').find()
                .toArray();
        }
    } catch (error) {
        let resultado = !esNanny == true ? "Usuarios" : "Nannys"
        console.log(`${resultado} no encontrados. ` + error)
    }
    return usuarios;
}

async function getUsuario(id, esNanny) {
    const clienteMongo = await connection.getConnection();
    let usuario = null;
    if (esNanny) {
        usuario = await clienteMongo.db(dbName).collection('nannys')
            .findOne({ _id: new objectId(id) });
    } else {
        usuario = await clienteMongo.db(dbName).collection('usuarios')
            .findOne({ _id: new objectId(id) });
    }
    if (!usuario) {
        throw new UserError('No se encontro usuario', 404);
    }
    return usuario;
}

async function getNanniesByTurno(turno) {
    const clienteMongo = await connection.getConnection();
    let nannies = null;
    try {
        validator.checkTurno2(turno);
        nannies = await clienteMongo.db(dbName).collection('nannys')
            .find({ turno: turno }).toArray()
    } catch (error) {
        console.log("No se encontro ninieras para ese turno. Error: " + error)
    }
    return nannies;
}

async function getNanniesByMascota(mascota) {
    const clienteMongo = await connection.getConnection();
    //se transforma el string a booleano.
    let boolMascota = false
    if ( mascota == "true"){
        boolMascota = true;
    }
    let nannies = null;
    validator.checkBool(boolMascota);
    nannies = await clienteMongo.db(dbName).collection('nannys')
        .find({ cuidaMascotas: boolMascota }).toArray()
        console.log(nannies)
    return nannies;
}

async function addUsuario(usuario, esNanny) {
    const clienteMongo = await connection.getConnection();
    let agregar = null;
    if (esNanny) {
        validator.validarNanny(usuario.isNanny, usuario.nombre, usuario.apellido, usuario.fecha_nacimiento,
            usuario.mail, usuario.ciudad, usuario.dni, usuario.turno, usuario.dias, usuario.cuidaMascotas)
        usuario.password = bcrypt.hashSync(usuario.password, 8);
        agregar = await clienteMongo.db(dbName).collection('nannys').insertOne(usuario);
    } else {
        validator.validarUsuario(usuario.isNanny, usuario.nombre, usuario.apellido, usuario.fecha_nacimiento,
            usuario.mail, usuario.ciudad, usuario.dni, usuario.turno, usuario.dias)
        usuario.password = bcrypt.hashSync(usuario.password, 8);
        agregar = await clienteMongo.db(dbName).collection('usuarios').insertOne(usuario);
    }
    return agregar;
}

function UserError(message, state) {
    this.message = message;
    this.name = "Error: ";
    this.state = state
}

async function findByCredentials(email, password, esNanny) {
    const clienteMongo = await connection.getConnection();
    let user = null;
    let resultado = !esNanny ? "Usuario" : "Usuario Nanny"
    let collection = !esNanny ? "usuarios" : "nannys"
    user = await clienteMongo.db(dbName).collection(collection).findOne({ mail: email });
    if (!user) {
        throw new UserError('Mail no encontrado', 404);
    } else {
        const passwordValida = bcrypt.compareSync(password, user.password);
        if (!passwordValida) {
            throw new UserError('Password invalida', 404);
        }
    }
    console.log(`${resultado} encontrado correctamente.`)
    return user;
}

async function generateJWT(user) {
    const token = jwt.sign({ _id: user._id, email: user.mail }, process.env.SECRET, { expiresIn: '1h' });
    return token;
}

async function updateUsuario(usuario, id, esNanny) {
    const clienteMongo = await connection.getConnection();
    const query = { _id: new objectId(id) };
    let newvalues = {};
    if (!esNanny) {
        validator.validarUpdateUsuario(usuario.mail, usuario.ciudad, usuario.turno, usuario.dias);
        newvalues = {
            $set: {
                mail: usuario.mail,
                ciudad: usuario.ciudad,
                turno: usuario.turno,
                dias: usuario.dias
            }
        };
    } else {
        validator.validarUpdateNanny(usuario.mail, usuario.ciudad, usuario.turno, usuario.dias, usuario.cuidaMascotas);
        newvalues = {
            $set: {
                mail: usuario.mail,
                ciudad: usuario.ciudad,
                turno: usuario.turno,
                dias: usuario.dias,
                cuidaMascotas: usuario.cuidaMascotas
            }
        };
    }
    let collection = !esNanny ? "usuarios" : "nannys"
    let actualizar = null;
    actualizar = await clienteMongo.db(dbName).collection(collection)
        .updateOne(query, newvalues);
    return actualizar;
}

async function deleteUsuario(id, esNanny) {
    const clienteMongo = await connection.getConnection();
    let collection = !esNanny ? "usuarios" : "nannys"
    let borrar = null;
    borrar = await clienteMongo.db(dbName).collection(collection).deleteOne({ _id: new objectId(id) });
    console.log(borrar)
    if (!borrar) {
        throw new UserError('No se encontro usuario a borrar', 404);
    }
    return borrar;
}

async function agregarFavoritos(userId, userEsNanny, userFavoritoId, userFavoritosEsNanny) {
    const clienteMongo = await connection.getConnection();
    let user = await getUsuario(userId, userEsNanny);
    let repetido = false
    user.favoritos.forEach(fav => {
        if (fav._id == userFavoritoId) {
            repetido = true;
        }
    });
    if (repetido) {
        throw new UserError('El usuario ya se encuentra en favoritos', 400);
    }
    let userFavorito = await getUsuario(userFavoritoId, userFavoritosEsNanny);
    const query = { _id: new objectId(userId) };
    const newvalues = {
        $push: {
            "favoritos": {
                "_id": userFavoritoId, "nombre": userFavorito.nombre,
                "apellido": userFavorito.apellido
            }
        }
    };
    let collection = !userEsNanny ? "usuarios" : "nannys"
    const resultado = await clienteMongo.db(dbName).collection(collection)
        .updateOne(query, newvalues);
    return resultado;
}

async function borrarFavoritos(userFavoritosId, usuario) {
    const clienteMongo = await connection.getConnection();
    const query = { _id: new objectId(usuario._id) };
    const newvalues = { $pull: { "favoritos": { "_id": userFavoritosId } } };
    let collection = !usuario.isNanny ? "usuarios" : "nannys"
    const resultado = await clienteMongo.db(dbName).collection(collection)
        .updateOne(query, newvalues);
    if (resultado.modifiedCount == 0) {
        throw new UserError('El usuario no se pudo eliminar de favoritos', 400);
    }
    return resultado;
}


module.exports = {
    getUsuarios, getUsuario, addUsuario, updateUsuario, deleteUsuario, findByCredentials, generateJWT
    , agregarFavoritos, borrarFavoritos, getNanniesByTurno, getNanniesByMascota
};