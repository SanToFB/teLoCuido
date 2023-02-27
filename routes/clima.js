var express = require('express');
var router = express.Router();
const clima = require('../controllers/clima');

router.get('/api/clima', async (req, res) => {
    let lat = req.body.lat;
    let lon = req.body.lon;
    let pronostico = null;
    pronostico = await clima.getClima(lat,lon);
    if (pronostico == null) {
        res.status(404)           //404 recurso no encontrado.
    } else {
        res.json(pronostico);
    }
});

module.exports = router