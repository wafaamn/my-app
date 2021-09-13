const express = require('express');
const router = express.Router();
const imageController= require('../controllers/image-controller');
var imageMiddleware= require('../middlewares/image-middleware');
var imageModel= require('../models/image-model');
var multer  = require('multer');
var con = require('../conn/conn');
router.get('/store-image',imageController.imageUploadForm);

//router.post('/store-image/:id',imageController.storeImage);

router.post('/store-image/:id',function(req,res){
   var idpat=req.params.id;
    console.log(idpat);
    var upload = multer({
                storage: imageMiddleware.image.storage(), 
                allowedImage:imageMiddleware.image.allowedImage 
                }).single('image');
    upload(req, res, function (err) {
       if (err instanceof multer.MulterError) {
          res.send(err);
       } else if (err) {
          res.send(err);
       }else{
          // store image in database
           var imageName = req.file.originalname;
           console.log(imageName)
           var inputValues = {
              image: imageName
           }
           console.log(idpat);
           console.log(inputValues);

          // var sql='insert into bilan (idpat,image) value(?,?)';
           con.query('insert into bilan (image,idpat) values(?,?)',[inputValues.image, idpat], function (err, data) {
               if (err) throw err;
               console.log('image')
            });
           var msg = inputValues.image+ "is uploaded successfully";
         // call model
    /*     imageModel.storeImage(inputValues, function(data){
           res.render('upload-form',{alertMsg:data})
         
         })*/
        
       }
      

   
    })
    
 })
module.exports = router;