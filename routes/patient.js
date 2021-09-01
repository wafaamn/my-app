var express = require('express');
var patient = express.Router();
var con = require('../conn/conn');


// patient.get('/', function (request, response) {
//     response.render('home')
// });
// // patient.get('/index', function (request, response) {
// //     response.render('home')
// // });
// // patient.get('/connect', function (request, response) {
// //     response.render('login')
// // });
// // //Handle POST request for User Login
// // patient.post('/auth', function (request, response) {

// //     var username = request.body.username;
// //     var password = request.body.password;
// //     if (username && password){
// //         con.query('SELECT * FROM utilisateur WHERE email = ? AND MotPasse = ?', [username, password], function (error, results, fields){
// //             if(results.length>0){
// //                 request.session.loggedin = true;
// //                 con.query('SELECT Email FROM patient WHERE Email = ?', [email], function (err, result) {
// //                     if (result.length > 0) {
// //                         response.redirect('/patient/:id');
// //                     }
// //                 })
// //             } else {
// //                 response.send('Incorrect Username and/or Password!');
// //             }
// //             response.end();
// //         })

// //     } else {
// //         response.send('Please enter Username and Password!');
// //         response.end();
// //     }
                
// // });


patient.get('/patient/:id', function(req,res){
    res.render('patient');
});

patient.post('/patient/:id',function(req,res){
    console.log('i am here')
    var userid = req.params.id;
    var date = req.body.date;
    var hdebut = req.body.hdebut;
    var hfin = req.body.hfin;
    var txt = req.body.txt;
    console.log('and here')


    var rdv = 'INSERT INTO demanderdv (dateRDV ,HeureDébutRDV , HeureFinRDV,Motif,IdPatient)  Values (? , ? , ? , ? , ? )';
        con.query(rdv, [date, hdebut, hfin, txt, userid], function (err, result) {
            if (err) throw err;
            console.log('insertion de rdv est terminé', result);
            res.redirect('/patient')

        })
        

})

module.exports= patient; 
