var express = require('express');
var router = express.Router();
const user = require('../controllers/users');
const auth = require('../middleware/auth');

/* GET usuarios listing. */
router.get('/api/users', async (req, res) => {
    let usuarios = await user.getUsuarios(false);
    res.send(usuarios);
});

router.get('/api/user/:id', async (req, res) => {
    let id = req.params.id;
    let usuario = null;
    try{
        usuario = await user.getUsuario(id, false);
        res.json(usuario);
    }catch(error){
        res.status(error.state).send(error.name + error.message); 
    }
});

router.post('/api/user', async (req, res) => {
    let usuarioAgregar = req.body.user;
    let usuario = null;
    try {
        usuario = await user.addUsuario(usuarioAgregar, false);
        res.json(usuario);
    } catch (error) {
        res.status(400).send(error.name + error.message);
    }
});

router.post('/api/login', async (req, res) => {
    let mail = req.body.mail;
    let pass = req.body.password;
    try {
        let usuario = await user.findByCredentials(mail, pass, false);
        const token = await user.generateJWT(usuario);
        res.send({ usuario, token });
    } catch (error) {
        res.status(error.state).send(error.message); 
    }
});


router.put('/api/user/:id', /*auth,*/ async (req, res) => {
    let id = req.params.id;
    let usuario = req.body.user;
    try{
        usuario = await user.updateUsuario(usuario, id, false);
        res.json(usuario);
    }catch(error){
        res.status(400).send(error.message);
    }
});

router.delete('/api/user/:id', auth, async (req, res) => {
    let id = req.params.id;
    try{
        let usuarioAEliminar = await user.getUsuario(id, false);
        await user.deleteUsuario(id, false);
        res.send(usuarioAEliminar);  
    }catch (error){
        res.status(error.state).send(error.name + error.message); 
    }
});

router.post('/api/agregarFavoritos', /*auth,*/ async (req, res) => {
    let userId = req.body.userId;
    let userFavoritosId = req.body.userFavoritosId;
    try{
        let result = await user.agregarFavoritos(userId, false, userFavoritosId, true);
        res.send(result);
    }catch (error){
        res.status(error.state).send(error.name + error.message); 
    }
});


router.put('/api/borrarFavoritos', /*auth,*/ async (req, res) => {
    let userFavoritosId = req.body.userFavoritosId;
    let result = null;
    try {
        let usuario = await user.getUsuario(req.body.userId, false);
        result = await user.borrarFavoritos(userFavoritosId, usuario);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message); //400 Bad Request. 
    }
});



module.exports = router