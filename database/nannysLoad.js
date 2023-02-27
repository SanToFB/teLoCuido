const bcrypt = require('bcryptjs');
db = db.getSiblingDB('teLoCuido');
db.nannys.drop();
db.nannys.insertMany([
    
    {
        "isNanny": true,
        "nombre": "Camila",
        "apellido": "Gutiérrez",
        "fecha_nacimiento": "19 / 01 / 1999",
        "ciudad": "Belgrano",
        "dni": "41.525.874",
        "turno":["mañana"],
        "dias":["lunes","martes", "sabado","domingo"],
        "mail":"camiG@gmail.com",
        "cuidaMascotas": true,
        "favoritos": [],
        "password":bcrypt.hashSync("abc123", 8)
    },
    {
        "isNanny": true,
        "nombre": "Belén",
        "apellido": "Pérez",
        "fecha_nacimiento": "20 / 02 / 2000",
        "ciudad": "Avellaneda",
        "dni": "41.828.878",
        "turno":["mañana","tarde"],
        "dias":["lunes","martes","miercoles","jueves","viernes"],
        "mail":"camiG@gmail.com",
        "cuidaMascotas": true,
        "favoritos": [],
        "password":bcrypt.hashSync("abc123", 8)
    },
    {
        "isNanny": true,
        "nombre": "Juana",
        "apellido": "Iglesias",
        "fecha_nacimiento": "21 / 3 / 1981",
        "ciudad": "Núñez",
        "dni": "33.225.814",
        "turno":["tarde","noche"],
        "dias":["lunes","martes","miercoles","jueves","viernes"],
        "mail":"camiG@gmail.com",
        "cuidaMascotas": true,
        "favoritos": [],
        "password":bcrypt.hashSync("abc123", 8)
    },
    {
        "isNanny": true,
        "nombre": "Martina",
        "apellido": "Martínez",
        "fecha_nacimiento": "05 / 04 / 1996",
        "ciudad": "Beccar",
        "dni": "39.387.151",
        "turno":["tarde","noche"],
        "dias":["lunes","martes","miercoles","jueves","viernes"],
        "mail":"camiG@gmail.com",
        "cuidaMascotas": true,
        "favoritos": [],
        "password":bcrypt.hashSync("abc123", 8)
    },
    {
        "isNanny": true,
        "nombre": "Lucia",
        "apellido": "López",
        "fecha_nacimiento": "13 / 07 / 1998",
        "ciudad": "La Lucila",
        "dni": "40.825.822",
        "turno":["tarde","noche"],
        "dias":["lunes","martes","miercoles","jueves","viernes"],
        "mail":"camiG@gmail.com",
        "cuidaMascotas": true,
        "favoritos": [],
        "password":bcrypt.hashSync("abc123", 8)
    }
    

])