var express = require('express');
var router = express.Router();
const msg = require('../controllers/messages');
const auth = require('../middleware/auth');

//Agregar mensaje.
router.post('/api/enviarMensaje', async (req, res) => {
    let message = req.body.message;
    let result
    try {
        result = await msg.addMessage(message);
        res.send(result);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

//GET mensajes.
router.get('/api/mensajes', async (req, res) => {
    let userId = req.body.userId;
    let nannyId = req.body.nannyId;
    console.log("userId: " + userId);
    console.log("nannyId: " + nannyId);
    let mensajes = await msg.getMessages(userId, nannyId);
    res.send(mensajes);
});

router.get('/api/mensaje', async (req, res) => {
    let id = req.body.id;
    let mensaje = null;
    mensaje = await msg.getMessage(id);
    console.log("mensaje por id: " + mensaje.mensaje)
    if (mensaje == null) {
        res.status(404)           //404 recurso no encontrado.
    } else {
        res.json(mensaje);
    }
});

router.delete('/api/mensaje',/* auth,*/ async (req, res) => {
    let id = req.body.id;
    let result = await msg.deleteMessage(id);
    res.json(result);
});


module.exports = router