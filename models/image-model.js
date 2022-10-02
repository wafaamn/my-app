/*var con = require('../conn/conn');
module.exports={
    storeImage:function(inputValues,callback){
    
        var sql='insert into bilan (idpat,image) value(?,?)';
        con.query(sql,[idpat, inputValues.image], function (err, data) {
            if (err) throw err;
            console.log('image')
         });
        var msg = inputValues.image+ "is uploaded successfully";
    
       return callback(msg)
      }
        }*/
var db = require('../conn/conn');
module.exports = {
    displayImage: function (callback) {
        // check unique email address
        var sql = 'SELECT image_name FROM images';
        db.query(sql, function (err, data, fields) {
            if (err) throw err
            return callback(data);
        })
    }
}
    