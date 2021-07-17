var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var con = require('../conn/conn');

 

/* GET home page. 
router.get('/home', function(req, res, next) {
  if(req.session.flag == 1){
    req.session.destroy();
    res.render('loginn', { title: 'CodeLanguage', message : 'Email Already Exists' , flag : 1});
  }
  else if(req.session.flag == 2){
    req.session.destroy();
    res.render('index', { title: 'CodeLanguage', message : 'Registration Done. Please Login.', flag : 0});
  }
  else if(req.session.flag == 3){
    req.session.destroy();
    res.render('index', { title: 'CodeLanguage', message : 'Confirm Password Does Not Match.', flag : 1});
  }
  else if(req.session.flag == 4){
    req.session.destroy();
    res.render('loginn', { title: 'CodeLanguage', message : 'Incorrect Email or Password.', flag : 1 });
  }
  else{
    res.render('index', { title: 'CodeLanguage' });
  }
   
});*/

//Handle POST request for User Registration
/*router.post('/auth_reg', function(req, res, next){

  var fullname = req.body.fullname;
  var email = req.body.email;
  var password = req.body.password;
  var cpassword = req.body.cpassword;

  if(cpassword == password){

    var sql = 'select * from user where email = ?;';

    con.query(sql,[email], function(err, result, fields){
      if(err) throw err;

      if(result.length > 0){
        req.session.flag = 1;
        res.redirect('/');
      }else{

        var hashpassword = bcrypt.hashSync(password, 10);
        var sql = 'insert into user(fullname,email,password) values(?,?,?);';

        con.query(sql,[fullname,email, hashpassword], function(err, result, fields){
          if(err) throw err;
          req.session.flag = 2;
          res.redirect('/');
        });
      }
    });
  }else{
    req.session.flag = 3;
    res.redirect('/');
  }
});*/

router.get('/', function(request, response) {
response.render('home')
});
router.get('/index', function(request, response) {
  response.render('home')
  });
  router.get('/connect', function(request, response) {
    response.render('login')
    });
//Handle POST request for User Login
router.post('/auth',function(request,response){

  var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		con.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error,results,fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
       // response.render('interfacemedecin');
				response.redirect('/medecin');
			} else {
       
			response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

router.get('/medecin', function(request, response) {
	if (request.session.loggedin) {
	//	response.send('Welcome back, ' + request.session.username + '!');
		response.render('interface-medecin');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});
router.get('/creer' ,function(req,res){
  res.render('dossier-medical')
});
router.get('/examen' ,function(req,res){
  res.render('examen-medical')
});
router.get('/examenclinique' ,function(req,res){
  res.render('examen-clinique')
});
router.get('/rapport' ,function(req,res){
  res.render('rapport-medical')
});
router.get('/ordonnance' ,function(req,res){
  res.render('ordonnance')
});
router.get('/evacuation' ,function(req,res){
  res.render('evacuation')
});
router.get('/certificat' ,function(req,res){
  res.render('certificat-medical')
});
router.get('/orientation' ,function(req,res){
  res.render('orientation')
});

//Route For Home Page
//router.get('/home', function(req, res, next){
  //res.render('home', {message : 'Welcome, ' + req.session.email});
//});

//router.get('/logout', function(req, res, next){
  //if(req.session.email){
    //req.session.destroy();
    //res.redirect('/');
  //}
//})

module.exports = router;
