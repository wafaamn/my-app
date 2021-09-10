var mysql = require('mysql');

var con = mysql.createConnection({

    host : 'localhost',
    user : 'root',
    password : 'asmamohamed',
    database : 'sahtech',
    dateStrings:true
});

con.connect((err) => {
    if(err) throw err;
    console.log('Database Connected..');
});

module.exports = con;