var createError = require('http-errors');
var express = require('express');
const connectDB = require('./db');
const gameRoutes = require('./routes/games');
const loginRouter = require('./routes/login');
const dashboardRouter = require('./routes/dashboard');
const methodOverride = require('method-override');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the database
connectDB()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.use('/', indexRouter); // Set up the index router first
app.use('/', loginRouter); // Set up the login router separately
app.use('/dashboard', dashboardRouter);
app.use('/games', gameRoutes);
app.use('/users', usersRouter);
app.use(methodOverride('_method'));





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
