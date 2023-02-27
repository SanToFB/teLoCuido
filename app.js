var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

//const { body, validationResult } = require('express-validator');

const users = require ('./controllers/users');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var nanniesRouter = require('./routes/nannies');
var messagesRouter = require('./routes/messages');
var climaRouter = require('./routes/clima');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
app.use('/clima', climaRouter);
app.use('/nannies', nanniesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(next)
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Pendientes:
//6- Actualizar loadNannys y usuarios (collections). Nuevo load de archivos script, se cambio DNI por dni


/* revisar:
2-hacer un laod nuevo para cambiar los DNI por dni. Users y nannys
3- Es nannies no nannys.
4- BIN => chat.ejs
5- app.
6-socket
*/

module.exports = {app: app, server: server};
