var express = require('express');
var find = express.Router();
var con = require('../conn/conn');

find.post('', (req, res) => {

    let searchTerm = req.body.search;

    console.log(searchTerm);

    con.query('SELECT * FROM dossMEd WHERE nom = ?', ['%' + searchTerm + '%'], (err, rows) => {

        if (!err) {
            res.render( 'Dossiers-medicaux', { rows });
        } else {
            console.log(err);
        }

        console.log('the data from dossMed view : \n', rows);
    });


});

module.exports = find;