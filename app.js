var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { db } = require('./models/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var linksRouter = require('./routes/links');
var redirectionRouter = require('./routes/redirection');

var app = express();

app.use(express.json());

db.sync() //never set force:true in production, it drops database
  .then(() => console.log('Database connected'))
  .catch((err) => console.error(err));

app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/links', linksRouter)
// Route to handle the response page
app.get('/response', (req, res) => {
  const { link, code } = req.query;
  res.render('response', { link, code });
});
app.use('/', redirectionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
