var mysql = require('mysql');

var con = mysql.createConnection({

    host : 'localhost',
    user : 'root',
    password : '25192519',
    database : 'sahtech'
});

con.connect((err) => {
    if(err) throw err;
    console.log('Database Connected..');
});

module.exports = con;