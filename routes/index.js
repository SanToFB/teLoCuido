var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/teLoCuido', function(req, res, next) {
  res.render('index', { title: 'teLoCuido' });
});

router.get('/', function(req, res, next) {
  res.render('index');
});


module.exports = router;
