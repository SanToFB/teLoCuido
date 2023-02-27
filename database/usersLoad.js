const bcrypt = require('bcryptjs');
db = db.getSiblingDB('teLoCuido');
db.usuarios.drop();
db.usuarios.insertMany([

    {
        "isNanny": false,
        "nombre": "Jim",
        "apellido": "Morrison",
        "fecha_nacimiento": "15-04-1944",
        "ciudad": "Belgrano",
        "dni": "41.525.874",
        "turno":["mañana"],
        "dias":["lunes","martes","miercoles","jueves","viernes"],
        "favoritos":[],
        "mail": "jmorrison@gmail.com",
        "password": bcrypt.hashSync("abc-123", 8)
    },
    {
        "isNanny": false,
        "nombre": "Jimi",
        "apellido": "Hendrix",
        "fecha_nacimiento": "19-07-1943",
        "ciudad": "Belgrano",
        "dni": "41.525.874",
        "turno":["tarde","noche"],
        "dias":["lunes","martes","miercoles","jueves","viernes"],
        "favoritos":[],
        "mail": "jhendrix@gmail.com",
        "password": bcrypt.hashSync("abd-124", 8)
    },
    {
        "isNanny": false,
        "nombre": "John",
        "apellido": "Densmore",
        "fecha_nacimiento": "27-01-1944",
        "ciudad": "Belgrano",
        "dni": "41.525.874",
        "turno":["tarde","noche"],
        "dias":["lunes","martes","miercoles","jueves","viernes"],
        "favoritos":[],
        "mail": "jdensmore@gmail.com",
        "password": bcrypt.hashSync("abe-125", 8)
    },
    {
        "isNanny": false,
        "nombre": "Robert",
        "apellido": "Plant",
        "fecha_nacimiento": "20-08-1948",
        "ciudad": "Belgrano",
        "dni": "41.525.874",
        "turno":["tarde","noche"],
        "dias":["lunes","sabado","miercoles","jueves","viernes"],
        "favoritos":[],
        "mail": "jplant@gmail.com",
        "password": bcrypt.hashSync("abf-126", 8)
    },
    {
        "isNanny": false,
        "nombre": "Carlos",
        "apellido": "Santana",
        "fecha_nacimiento": "20-07-1947",
        "ciudad": "Belgrano",
        "dni": "41.525.874",
        "turno":["mañana","tarde"],
        "dias":["sabado","domingo","miercoles","jueves","viernes"],
        "favoritos":[],
        "mail": "csantana@gmail.com",
        "password": bcrypt.hashSync("abg-127", 8)
    }
])