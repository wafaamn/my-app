var express = require('express');
var patient = express.Router();
var con = require('../conn/conn');

patient.get('/patient/:id', function(req,res){
    var userid = req.params.id;
    var query = function(callback){
        con.query('SELECT * FROM patient WHERE IdPatient =?',[userid],function(err,result){
            if(err) throw err;
            console.log(result);
            return callback(result);
        })
    }
    var query1 = function(callback){
        con.query('SELECT * FROM RendezVous WHERE IdPatient =?',[userid],function(err,results){
            if(err) throw err ;
            console.log('hello')
            console.log(results);
            return callback(results)
        })
    }
    var query2 = function (callback) {
        con.query('SELECT * FROM demanderdv WHERE IdPatient =?', [userid], function (err, results) {
            if (err) throw err;
            console.log('hello')
            console.log(results);
            return callback(results)
        })
    }

    query(function(result){
        query1(function(results){
            query2(function(result1){
                res.render('patient', { data: results, data1: result , data2 : result1 })
            })
        })
    })
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

        })

    res.redirect(`/patient/${userid}`)
        

})

module.exports= patient; 
