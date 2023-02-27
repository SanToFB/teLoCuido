var express = require('express');
var router = express.Router();
const user = require('../controllers/users');
const auth = require('../middleware/auth');

/* GET nannies listing. */
router.get('/api/nannies', async (req, res) => {
    let usuarios = await user.getUsuarios(true);
    res.send(usuarios);
});

router.get('/api/nanny/:id', async (req, res) => {
    let id = req.params.id;
    let usuario = null;
    try{
        usuario = await user.getUsuario(id, true);
        res.json(usuario);
    }catch(error){
        res.status(error.state).send(error.name + error.message); 
    }
});


router.get('/api/nanniesByTurno/:turno', async (req, res) => {
    let turno = req.params.turno.toLowerCase();
    let nannies = await user.getNanniesByTurno(turno);
    res.send(nannies);
});

router.get('/api/nanniesByMascota/:mascota', async (req, res) => {
    let esMascota = req.params.mascota.toLowerCase();
    let nannies = null;
    try{
        nannies = await user.getNanniesByMascota(esMascota);
        res.send(nannies);
    }catch (error){
        res.send(error);
    }
});

router.post('/api/nanny', async (req, res) => {
    let usuarioAgregar = req.body.user;
    let usuario = null;
    try {
        usuario = await user.addUsuario(usuarioAgregar, true);
        res.json(usuario);
    } catch (error) {
        res.status(400).send(error.name + error.message);
    }
});

router.post('/api/login', async (req, res) => {
    let mail = req.body.mail;
    let pass = req.body.password;
    try {
        let usuario = await user.findByCredentials(mail, pass, true);
        const token = await user.generateJWT(usuario);
        res.send({ usuario, token });
    } catch (error) {
        res.status(error.state).send(error.message); 
    }
});

router.put('/api/nanny/:id',/*auth,*/ async (req, res) => {
    let id = req.params.id;
    let usuario = req.body.user;
    try{
        usuario = await user.updateUsuario(usuario, id, true);
        res.json(usuario);
    }catch(error){
        res.status(400).send(error.message);
    }
});

router.delete('/api/nanny/:id', /*auth,*/ async (req, res) => {
    let id = req.params.id;
    try{
        let usuarioAEliminar = await user.getUsuario(id, true);
        await user.deleteUsuario(id, true);
        res.send(usuarioAEliminar);  
    }catch (error){
        res.status(error.state).send(error.name + error.message); 
    }
});

router.post('/api/agregarFavoritos', async (req, res) => {
    let userId = req.body.userId;
    let userFavoritosId = req.body.userFavoritosId;
    try{
        let result = await user.agregarFavoritos(userId, true, userFavoritosId, false);
        res.send(result);
    }catch (error){
        res.status(error.state).send(error.name + error.message); 
    }
});


router.put('/api/borrarFavoritos', async (req, res) => {
    let userFavoritosId = req.body.userFavoritosId;
    let result = null;
    try {
        let usuario = await user.getUsuario(req.body.userId, true);
        result = await user.borrarFavoritos(userFavoritosId, usuario);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message); //400 Bad Request. 
    }
});



module.exports = router