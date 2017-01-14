var express = require('express');
var socket_io = require('socket.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var consign = require('consign');
var methodOverride = require('method-override');
var cookieSession = require('cookie-session');
var expressSession = require('express-session');
var store = new expressSession.MemoryStore();
const KEY = 'ntalk.sid', SECRET = 'ntalk';

var app = express();

// socket.io
var io = socket_io();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var cookie = cookieParser(SECRET);

app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieSession({name: 'session', keys: ['key1', 'key2']}));
app.use(methodOverride('_method'));
app.use(cookie);

app.use(expressSession({
  secret: SECRET,
  key: KEY,
  resave: false,
  saveUninitialized: false,
  store: store
}));

io.set('authorization', function(data, accept) {
  cookie(data, {}, function(err) {
    var sessionID = data.signedCookies[KEY];
    store.get(sessionID, function(err, session) {
      if (err || !session) {
        accept(null, false);
      } else {
        data.session = session;
        accept(null, true);
      }
    });
  });
});

// consign (express-load)
consign()
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app);
consign()
  .include('sockets')
  .into(io);

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
