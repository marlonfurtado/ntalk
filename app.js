var express = require('express');
var socket_io = require('socket.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var consign = require('consign');
var cookieSession = require('cookie-session');
var methodOverride = require('method-override');

var app = express();

// socket.io
var io = socket_io();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({name: 'session', keys: ['key1', 'key2']}));
app.use(methodOverride('_method'));

// consign (express-load)
consign()
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app);

// socket.io
  app.io.on('connection', function(client){
    client.on('send-server', function(data){
      var msg = "<b>"+data.email+":</b> "+data.msg+"<br>";
      client.emit('send-client', msg);
      client.broadcast.emit('send-client', msg);
    });
  });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: "Ntalk | Agenda de contatos"});
});

module.exports = app;
