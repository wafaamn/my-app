var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var cookieSession = require('cookie-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var creerDossRouter = require('./routes/CreerDossier')
var PatientRouter = require('./routes/patient');
var InfirmierRouter = require('./routes/infirmier');
var statRouter = require('./routes/static')
var con = require('./conn/conn');
var session = require('express-session');
<<<<<<< HEAD
var imageRouter = require('./routes/image-route');
=======
var http = require('http');
>>>>>>> e2264bcda0503ec2fef5da48f6e77c59a0dc5d42
var app = express();

app.use(session({
  secret : 'ABCDefg',
<<<<<<< HEAD
  resave : false,
  //cookie:{maxAge:  },
=======
  resave : true,
>>>>>>> e2264bcda0503ec2fef5da48f6e77c59a0dc5d42
  saveUninitialized : true
}));
// app.use(cookieSession({ keys: ['abc'], name: 'user' }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);/* 
app.use('/users', usersRouter);*/
app.use('/creer', creerDossRouter);
app.use('', PatientRouter);
<<<<<<< HEAD
app.use('/infirmier', InfirmierRouter);
app.use('/', imageRouter);
=======
app.use('', InfirmierRouter);
app.use('',statRouter)
// http.createServer(statRouter);
>>>>>>> e2264bcda0503ec2fef5da48f6e77c59a0dc5d42


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
  //res.render('error');
});

//Create Server
app.listen(5000, () => {
  console.log('Listening on port 5000...');
});

module.exports = app;
