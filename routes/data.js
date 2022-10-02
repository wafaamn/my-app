var con = require('../conn/conn')
var express = require('express')
var router = express.Router();

var data = con.query('select * from myview');
console.log(data);

module.exports = router ;