var con = require('../conn/conn');
var express = require('express');
var stat = express();
var path = require('path')
var fs = require('fs');
// const { default: collect } = require('collect.js');
var jsonArray = [];
var collect = require('collect.js');
const { Http2ServerRequest } = require('http2');
var femme = 'SELECT * FROM patient WHERE sexe = "femme"'
var homme = 'SELECT * FROM patient WHERE sexe = "homme"';

// Fetching data from database
stat.get('/static', function (req, res) {
    http.createServer(function (req, response) {
        fs.readFile('stat.ejs', 'utf-8', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });

            var chartData = [];
            con.query('select * from patient', function (error, rows) {
                if (error) throw error;
                chartData.push(collect(rows.sexe == 'femme').count());
                chartData.push(collect(rows.sexe == 'homme').count());
                console.log(chartData);
                var result = data.replace('chartData', JSON.stringify(chartData));
                res.write(result);
                res.end();
            })

        });
    });
});


// function formatData(dataArray) {
//     for (var i = 0; i < dataArray.length; i++) {
//         patient[i] = dataArray[i];
//         // population[i] = dataArray[i].population;
//         // gdp[i] = dataArray[i].GDP;
//     }
//     jsonArray = [patient];
//     console.log("in FormatData()...\n");
//     console.log(jsonArray);
// }

module.exports = stat ; 
