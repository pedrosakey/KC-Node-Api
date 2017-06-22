var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('./lib/connectMongoose');
require('./models/Anuncio');
require('./models/Usuario');
var CustomError =  require('./models/CustomError');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Rutas de nuestra aplicacion
app.use('/'              , require('./routes/index'));
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuarios', require('./routes/apiv1/usuarios'));

//Errores

// 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// No una peticion a la api

app.use(function(err, req, res, next) {
  if(!isApi(req)) {
   let lang = req.query.lang;
   let  error = new CustomError('IS_NOT_API_REQUEST',401,lang);
    next(error);
    return;
  }
  next(err);
});

//Errores de personalizados
app.use(function(err, req, res, next) {
   console.log(err.status);
    res.json({success: false, error: err.message, status: err.status});
    return;
});

// error handler
app.use(function(err, req, res, next) {
    //console.log(err);

  // set locals, only providing error in development
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  //  res.locals.message = err.message;
  //  render the error page
  //  res.render('error');
});

function isApi(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
