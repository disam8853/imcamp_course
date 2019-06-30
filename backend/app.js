var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var passport = require("passport");
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var teachersRouter = require('./routes/teachers');

var app = express();
app.use(cors())

var mongoose = require('mongoose');
const option = {
  socketTimeoutMS: 20000,
  keepAlive: true,
  reconnectTries: 20000,
  useNewUrlParser: true
};

const mongoURI = 'mongodb+srv://admin:admin@cluster0-hw6no.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoURI, option).then(function() {
  //connected successfully
  console.log("connect db successfully!")
  // 要匯入小隊員資料才要用
  // require('./dataProcessor.js')
  // require('./testData.js')

}).catch(function(err) {
  //err handle
  console.log(err + "\nfuckkkkkkk u")
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')

app.use('/api', usersRouter);
app.use('/api/teacher', teachersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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

module.exports = app;