var con = require('../conn/conn');
var express = require('express');
var stat = express();
var path = require('path')
var fs = require('fs');
var http = require('http')
// const { default: collect } = require('collect.js');
var jsonArray = [];
var collect = require('collect.js');
const { Http2ServerRequest } = require('http2');

stat.get('/statistique',function(req,res){
    res.render('statistique');
})


// Fetching data from database
stat.get('/PatientsParSexe', function (req, res) {
        fs.readFile('./views/stat.ejs', 'utf-8', function (err, data) {
           if (err) throw err;
           res.writeHead(200, {'Content-Type': 'text/html' });
           var chartData = [];
           console.log(data);
           con.query('select * from patient', function (error, rows) {
               if (error) throw error;
               chartData.push(collect(rows.sexe == 'femme').count());
               chartData.push(collect(rows.sexe == 'homme').count());
               console.log(chartData)
               var result = data.replace('chartData', JSON.stringify(chartData));
               res.write(result)
               res.end();
          })

        })
});

stat.get('/Consultation',function(res,res){
    fs.readFile('./views/line.ejs', 'utf-8', function (err, data) {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var lineData = [];
        console.log(data);
        con.query('select count(IdConsultation) as num from consultation where Month(DateConsultation) = 01', function (err, result1) {
            con.query('select count(IdConsultation) as num from consultation where Month(DateConsultation) = 02', function (err, result2) {
                con.query('select count(IdConsultation) as num from consultation where Month(DateConsultation) = 03', function (err, result3) {
                    con.query('select count(IdConsultation) as num from consultation where Month(DateConsultation) = 04', function (err, result4) {
                        con.query('select count(IdConsultation) as num from consultation where Month(DateConsultation) = 05', function (err, result5) {
                            con.query('select count(IdConsultation) as num from consultation where Month(DateConsultation) = 06', function (err, result6) {
                                con.query('select count(IdConsultation) as num from consultation where Month(DateConsultation) = 07', function (err, result7) {
                                    con.query('select count(IdConsultation) as num from consultation where Month(DateConsultation) = 08', function (err, result8) {
                                        con.query('select count(IdConsultation) as num from consultation where Month(DateConsultation) = 09', function (err, result9) {
                                            con.query('select count(IdConsultation) as num from consultation where Month(DateConsultation) = 10', function (err, result10) {
                                                con.query('select count(IdConsultation) as num from consultation where Month(DateConsultation) = 11', function (err, result11) {
                                                    con.query('select count(IdConsultation) as num from consultation where Month(DateConsultation) = 12', function (err, result12) {
                                                        lineData.push(result1[0].num);
                                                        lineData.push(result2[0].num);
                                                        lineData.push(result3[0].num);
                                                        lineData.push(result4[0].num);
                                                        lineData.push(result5[0].num);
                                                        lineData.push(result6[0].num);
                                                        lineData.push(result7[0].num);
                                                        lineData.push(result8[0].num);
                                                        lineData.push(result9[0].num);
                                                        lineData.push(result10[0].num);
                                                        lineData.push(result11[0].num);
                                                        lineData.push(result12[0].num);
                                                        console.log(lineData);
                                                        var line = data.replace('lineData', JSON.stringify(lineData));
                                                        res.write(line)
                                                        res.end();
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })

                    })
                })
            })
        })
    })

})

stat.get('/PatientsParMaladies',function(req,res){
    fs.readFile('./views/PatientsParMaladie.ejs', 'utf-8', function (err, data) {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var barData = [];
        console.log(data);
        con.query('select count(hta) as antcd from antecedant', function (error, result1){
            con.query('select count(Cholecystectomie) as antcd from antecedant', function(err,result2){
                con.query('select count(Appendicectomie) as antcd from antecedant', function (err, result3){
                    con.query('select count(Cardiopathie) as antcd from antecedant', function (err, result4){
                        con.query('select count(Allergique) as antcd from antecedant', function (err, result5){
                            con.query('select count(Diabète) as antcd from antecedant', function (err, result6){
                                barData.push(result1[0].antcd);
                                barData.push(result2[0].antcd);
                                barData.push(result3[0].antcd);
                                barData.push(result4[0].antcd);
                                barData.push(result5[0].antcd);
                                barData.push(result6[0].antcd);
                                console.log(barData)
                                var result = data.replace('barData', JSON.stringify(barData));
                                res.write(result)
                                res.end();

                            })
                        })
                    })
                })
                
            })
        })
    })
    
})

module.exports = stat ; 
