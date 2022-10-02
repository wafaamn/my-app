var mysql = require('mysql');

var con = mysql.createConnection({

    host: 'biat4foatclkn4ba8g1z-mysql.services.clever-cloud.com',
    user: 'u5ymtvqlwdppkrbq',
    password: 'XpjxHDmqevoqW4F9Jbsd',
    database: 'biat4foatclkn4ba8g1z',
    dateStrings:true
});

con.connect((err) => {
    if(err) throw err;
    console.log('Database Connected..');
});

module.exports = con;