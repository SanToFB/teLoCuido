var express = require('express');
var router = express.Router();
const dataUser = require('../data/userdb');
const auth = require('../middleware/auth');

/* GET usuarios listing. */
router.get('/', async (req, res) => {
    const usuarios = await dataUser.getUsuarios();
    res.json(usuarios);
});

router.get('/:id', async (req, res) => {
    const usuario = await dataUser.getUsuario(req.params.id);
    res.json(usuario);
    /* if (usuario == null) {
        res.status(404);
    } else {
        res.json(usuario);
    } */
    //si no lo encuentra que mande un 404 recurso no encontrado. Al ser Json devuelve vacio.
});

router.post('/', async (req, res) => {
    //TODO Validacion
    console.log('Check point 1');
    console.log(req.body);
    const usuario = await dataUser.addUsuario(req.body);
    res.json(usuario);
});

router.post('/login', async (req, res) => {

    try {
        const user = await dataUser.findByCredentials(req.body.mail, req.body.password);
        const token = await dataUser.generateJWT(user);

        res.send({user, token});

    } catch (error) {
        res.status(401).send(error.message); //401 Indica desautorizado
    }
});


router.put('/:id', async (req, res) => {
    //TODO Validacion
    let id = req.params.id;
    let usuario = req.body;
    usuario._id = id;
    usuario = await dataUser.updateUsuario(usuario);
    res.json(usuario);
});
// el 'auth' dentro de los parametros, ejecuta el middleware
router.delete('/:id', auth, async (req, res) => {
    let id = req.params.id;
    await dataUser.deleteUsuario(id);
    res.send('Usuario eliminado');
});

router.post('/agregarFavoritos/:id', async (req, res) => {
    let id = req.params.id;
    let vuelo = req.body;
    await dataUser.agregarFavoritos(id,vuelo);
    res.json(await dataUser.getUsuario(id));
});


router.put('/borrarFavoritos/:id/:vueloId', async (req, res) => {
    let id = req.params.id;
    let vueloId = req.params.vueloId;
    await dataUser.borrarFavoritos(id,vueloId);
    res.json(await dataUser.getUsuario(id));
});



module.exports = router