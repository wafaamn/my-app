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
var imageRouter = require('./routes/image-route');
var data = require('./routes/data')
var app = express();
const oneDay = 1000 * 60 * 60 * 24;


app.use(session({
  secret : 'ABCDefg',
  resave : false,
  cookie:{maxAge: oneDay  },
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
app.use('', InfirmierRouter);
app.use('/', imageRouter);
app.use('',statRouter)
// app.use('/find', (req, res, next) => {
//   const filters = req.query;
//   const filteredUsers = data.filter(user => {
//     let isValid = true;
//     for (key in filters) {
//       console.log(key, user[key], filters[key]);
//       isValid = isValid && user[key] == filters[key];
//     }
//     return isValid;
//   });
//   res.send(filteredUsers);
// });


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
