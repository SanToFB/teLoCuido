const validator = require('validator')

//validar al hacer update de Usuario
function validarUpdateUsuario(mail, ciudad, turno, dias) {
    checkEmail(mail)
    checkAlpha(ciudad)
    checkTurno(turno)
    checkDias(dias)
}

//validar al hacer update de Usuario Nanny
function validarUpdateNanny(mail, ciudad, turno, dias, bool1, bool2) {
    checkEmail(mail)
    checkAlpha(ciudad)
    checkTurno(turno)
    checkDias(dias)
    checkBool(bool1)
    checkBool(bool2)
}

//validar al hacer add de Usuario
function validarUsuario(bool0, nombre, apellido, fecha, mail, ciudad, dni, turno, dias) {
    checkBool(bool0)
    checkAlpha(nombre)
    checkAlpha(apellido)
    checkDate(fecha)
    checkEmail(mail)
    checkAlpha(ciudad)
    checkNumeric(dni)
    checkTurno(turno)
    checkDias(dias)
}

//validar al hacer add de Usuario Nanny
function validarNanny(bool0, nombre, apellido, fecha, mail, ciudad, dni, turno, dias, bool1, bool2) {
    checkBool(bool0)
    checkAlpha(nombre)
    checkAlpha(apellido)
    checkDate(fecha)
    checkEmail(mail)
    checkAlpha(ciudad)
    checkNumeric(dni)
    checkTurno(turno)
    checkDias(dias)
    checkBool(bool1)
    checkBool(bool2)
}

function checkEmail(mail) {
    if (!validator.isEmail(mail)) {
        throw new UserError("El e-mail es invalido.")
    }
}

function checkAlpha(ciudad) {
    if (!validator.isAlpha(ciudad.toString(), ["en-US"], { ignore: " -" })) {
        throw new UserError(ciudad + " debe ser solo letras.")
    }
}

function checkTurno(turno) {
    values = ["mañana", "tarde", "noche"]
    turno.forEach(e => {
        if (!validator.isIn(e.toLowerCase(), values)) {
            throw new UserError("El turno " + e + " es invalido.")
        }
    });
}

function checkTurno2(turno) {
    values = ["mañana", "tarde", "noche"]
    if (!validator.isIn(turno.toLowerCase(), values)) {
        throw new UserError("El turno " + e + " es invalido.")
    }
}

function checkDias(dias) {
    values = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
    dias.forEach(e => {
        if (!validator.isIn(e.toLowerCase(), values)) {
            throw new UserError("El dia " + e + " es invalido.")
        }
    });
}

function checkBool(bool) {
    if (!validator.isBoolean(bool.toString())) {
        throw new UserError("Formato invalido. Debe ser true o false.")
    }
}

//Chequea que la fecha sea correcta y que sea mayor de edad.
function checkDate(date) {
    //console.log("fecha request: " + date)
    if (validator.isDate(date.toString())) {
        throw new UserError("Formato invalido. Debe ser una fecha.")
    }
    //Se obtiene fecha actual.
    let fecha = new Date(Date());
    //console.log("fecha actual: " +fecha.toLocaleDateString())
    let year = fecha.getFullYear();
    let month = fecha.getMonth();
    let day = fecha.getDate();

    //Se le resta 18 años para tener fecha referencia.
    let edadMinima = new Date((year - 18), month, day)
    //console.log("Fecha minima para mayoria: " + edadMinima.toLocaleDateString())
    let edad = edadMinima.toLocaleDateString().split('/')
    year = Number.parseInt(edad[2])
    month = Number.parseInt(edad[1])
    day = Number.parseInt(edad[0])

    //Se separa año, mes, dia de la fecha pasada por parametro para comparar y ver si es mayor de edad.
    let dateSplit = date.split('/')
    let anio = Number.parseInt(dateSplit[2])
    let mes = Number.parseInt(dateSplit[1])
    let dias = Number.parseInt(dateSplit[0])

    if (anio < year || anio == year && mes < month || anio == year && mes == month && dias <= day) {
        console.log("edad correcta")
    } else {
        throw new UserError("El usuario debe ser mayor de 18.")
    }
}

function checkNumeric(dni) {
    if (validator.isNumeric(dni.toString())) {
        throw new UserError("Formato invalido. Debe ser solo numeros.")
    }
}

function checkNumeric(dni) {
    if (validator.isNumeric(dni.toString())) {
        throw new UserError("Formato invalido. Debe ser solo numeros.")
    }
}

function checkId(id) {
    if (id == undefined || id == null) {
        throw new UserError('Falta usuario o nanny en el mensaje');
    } else if (!validator.isAlphanumeric(id)){
        throw new UserError("Formato invalido de id.")
    }
}

function UserError(message) {
    this.message = message;
    this.name = "Error al validar datos: ";
}


module.exports = {
    checkId, validarUsuario, validarNanny, validarUpdateUsuario, validarUpdateNanny,
    checkTurno2, checkBool
}