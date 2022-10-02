var express = require('express');
var infirmier = express.Router();
var con = require('../conn/conn');
var nodemailer = require('nodemailer');
const { Console } = require('console');



infirmier.get('/infirmier/:id', function (req, res) {
    var inf = 'select * from infirmier where IdInfirmier = ?'
    var demande = 'SELECT * FROM demande WHERE IdDemandeRDV IS NOT NULL; ';
    var rdv = 'SELECT * FROM rdv WHERE IdRDV IS NOT NULL;';
    var query = function(callback){
        con.query(demande, function (err, data) {
            if (err) throw err;
            console.log(data);
            return callback(data);
        })
    }
    var query2 = function(callback){
        con.query(rdv , function(err,result){
            if (err) throw err;
            console.log(result);
            return callback(result);
        })
    }
    var query3 = function(callback){
        con.query(inf,[req.params.id],function(err, row){
            if (err) throw err;
            console.log(row)
            return callback(row);
        })
    }

     query2(function(result){
        query(function(data){
            query3(function(row){
                res.render(`infirmier`, {  demandeData: data, rdv: result , data : row})
            })
        })
     })
});

infirmier.post('/modifier/:id', (req,res)=>{
    var demandeid = req.params.id ; 
    console.log('id de demande est :' , demandeid)
    var date = req.body.date; 
    var hdebut = req.body.hdebut;
    var hfin = req.body.hfin ;
    var idInf = req.session.userid;
    console.log(idInf)
    var idpatient = 'SELECT IdPatient FROM demanderdv WHERE IdDemandeRDV = ?';
    var motiff = 'SELECT Motif FROM demanderdv WHERE IdDemandeRDV = ?'
    var rdv = 'INSERT INTO RendezVous (dateRDV ,HeureDébutRDV , HeureFinRDV,Motif,IdPatient , IdInfirmier) Values (? , ? , ? , ? , ? , ?)'
    var supp = 'DELETE FROM demanderdv WHERE IdDemandeRDV =?'

    
    con.query(idpatient,[demandeid],function(err, result){
        if(err) throw err ; 
        if(result.length>0 ){
            var idp = result[0].IdPatient;
            console.log('id patient is :',idp);
        }
        con.query(motiff,[demandeid], function(err , result){
            if (err) throw err;
            if (result.length > 0) {
                var motif = result[0].Motif;
                console.log('motif is :', motif);
            }

                con.query(rdv, [date, hdebut, hfin, motif, idp, idInf], function (err, result) {
                    if (err) throw err;
                    console.log('modification est faite perfectement !')


                })

            con.query('select IdPatient FROM`demanderdv` WHERE IdDemandeRDV = ?', [req.params.id], function (err, result) {
                if (err) throw err;
                idp = result[0].IdPatient;
                con.query('SELECT nom FROM patient WHERE IdPatient = ?', [idp], function (err, result) {
                    if (err) throw err;
                    nom = result[0].nom;
                    con.query('SELECT prenom FROM patient WHERE IdPatient = ?', [idp], function (err, result) {
                        if (err) throw err;
                        prenom = result[0].prenom;

                        const modifier = `<h3>Bonjour ${nom} ${prenom} </h3><p>votre rendez-vous est remporté en <b>${date}</b> de <b> ${hdebut}</b> à <b> ${hfin}</b>  </p>`

                        con.query('SELECT Email FROM patient WHERE IdPatient = ?', [idp], function (err, result) {
                            if (err) throw err;
                            email = result[0].Email;
                            let transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    type: 'OAuth2',
                                    user: 'sahtechteam@gmail.com',
                                    pass: 'Sahtech&99',
                                    clientId: '1056334353973-jlhf0iv3ehte9r17nsgt99fk6c5tobdg.apps.googleusercontent.com',
                                    clientSecret: 'AJFLB4fCH0VjmZz9SkO7W6Ca',
                                    refreshToken: "1//04Wae0z0mo6t1CgYIARAAGAQSNwF-L9IrZB_YnN8vgkjal1zpLYV8U5z2rFx62dulCGDj8uPFcPEE-j2Dp8z4tKJ7iL7On7AvNPw"
                                }
                            })

                            let mailOptions = {
                                from: '"Team Sahtech" <sahtechteam@gmail.com>', // sender address
                                to: email, // list of receivers
                                subject: "modification de rendez-vous avec ", // Subject line
                                text: "rdv", // plain text body
                                html: modifier, // html body
                            };

                            transporter.sendMail(mailOptions, function (err, data) {
                                if (err) {
                                    console.log("Error " + err);
                                } else {
                                    console.log("Email sent successfully");
                                }
                            });
                            con.query(supp, [demandeid], function (err, result) {
                                if (err) throw err;
                                console.log('suppression est faite !');

                            })
                        })
                    })
                })
        
        })
        
    })
        res.redirect(`/infirmier/${idInf}`)

        

    })
   

})

infirmier.get('/supprimer/:id', (req, res) => {
    console.log('msg')
    var id = req.session.userid;
    console.log(req.session)
    
    console.log('we want to delete it ');
    
    con.query('select IdPatient FROM`RendezVous` WHERE IdRDV = ?', [req.params.id], function (err, result) {
        if (err) throw err;
        idp = result[0].IdPatient;
        con.query('SELECT nom FROM patient WHERE IdPatient = ?', [idp], function (err, result) {
            if (err) throw err;
            nom = result[0].nom;
            con.query('SELECT prenom FROM patient WHERE IdPatient = ?', [idp], function (err, result) {
                if (err) throw err;
                prenom = result[0].prenom;
                const supprimer = `<h3> Bonjour  ${nom} ${prenom} </h3> <p> vous avez raté votre rendez vous </p>`


                con.query('SELECT Email FROM patient WHERE IdPatient = ?', [idp], function (err, result) {
                    if (err) throw err;
                    email = result[0].Email;
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            type: 'OAuth2',
                            user: 'sahtechteam@gmail.com',
                            pass: 'Sahtech&99',
                            clientId: '1056334353973-jlhf0iv3ehte9r17nsgt99fk6c5tobdg.apps.googleusercontent.com',
                            clientSecret: 'AJFLB4fCH0VjmZz9SkO7W6Ca',
                            refreshToken: "1//04Wae0z0mo6t1CgYIARAAGAQSNwF-L9IrZB_YnN8vgkjal1zpLYV8U5z2rFx62dulCGDj8uPFcPEE-j2Dp8z4tKJ7iL7On7AvNPw"

                        }
                    })

                    let mailOptions = {
                        from: '"Team Sahtech" <sahtechteam@gmail.com>', // sender address
                        to: email, // list of receivers
                        subject: "suppression de rendez-vous avec ", // Subject line
                        text: "rdv", // plain text body
                        html: supprimer, // html body
                    };

                    transporter.sendMail(mailOptions, function (err, data) {
                        if (err) {
                            console.log("Error " + err);
                        } else {
                            console.log("Email sent successfully");
                        }
                    });
                })
            })
    
        })
    })
    con.query('DELETE FROM `RendezVous` WHERE IdRDV = ?', [req.params.id], (err, results) => {
        console.log('message from here')
        if (err) throw err;
        res.redirect(`/infirmier/${id}`);

    });
});

infirmier.get('/refuser/:id', (req, res) => {
    console.log('msg')
    var id = req.session.userid;
    console.log(req.session)

    console.log('we want to delete it ');

    con.query('select IdPatient FROM`demanderdv` WHERE IdDemandeRDV = ?', [req.params.id], function (err, result) {
        if (err) throw err;
        idp = result[0].IdPatient;
        con.query('SELECT nom FROM patient WHERE IdPatient = ?', [idp], function (err, result) {
            if (err) throw err;
            nom = result[0].nom;
            con.query('SELECT prenom FROM patient WHERE IdPatient = ?', [idp], function (err, result) {
                if (err) throw err;
                prenom = result[0].prenom;
                const refuser = ` <h3> Bonjour ${nom} ${prenom} </h3> <p> votre demande a été refuser  </p>`

                con.query('SELECT Email FROM patient WHERE IdPatient = ?', [idp], function (err, result) {
                    if (err) throw err;
                    email = result[0].Email;
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            type: 'OAuth2',
                            user: 'sahtechteam@gmail.com',
                            pass: 'Sahtech&99',
                            clientId: '1056334353973-jlhf0iv3ehte9r17nsgt99fk6c5tobdg.apps.googleusercontent.com',
                            clientSecret: 'AJFLB4fCH0VjmZz9SkO7W6Ca',
                            refreshToken: "1//04Wae0z0mo6t1CgYIARAAGAQSNwF-L9IrZB_YnN8vgkjal1zpLYV8U5z2rFx62dulCGDj8uPFcPEE-j2Dp8z4tKJ7iL7On7AvNPw"

                        }
                    })

                    let mailOptions = {
                        from: '"Team Sahtech" <sahtechteam@gmail.com>', // sender address
                        to: email, // list of receivers
                        subject: "refus de rendez-vous avec ", // Subject line
                        text: "rdv", // plain text body
                        html: refuser, // html body
                    };

                    transporter.sendMail(mailOptions, function (err, data) {
                        if (err) {
                            console.log("Error " + err);
                        } else {
                            console.log("Email sent successfully");
                        }
                    });
                })
            })
        })
    })
    con.query('DELETE FROM `demanderdv` WHERE IdDemandeRDV = ?', [req.params.id], (err, results) => {
        console.log('message from here')
        if (err) throw err;
        res.redirect(`/infirmier/${id}`);
        });
})


infirmier.get('/valider/:id', (req, res) => {
    var idInf = req.session.userid;
    console.log(idInf)
    console.log('on n\'est accepter ce rdv ');
    con.query('select DateRDV FROM `demanderdv` WHERE IdDemandeRDV = ?', [req.params.id], (err, results) => {
        if (err) throw err;
        if(results.length>0 ){
            dateRDV = results[0].DateRDV ;
            console.log('date rdv ', dateRDV)
            con.query('select HeureDébutRDV FROM `demanderdv` WHERE IdDemandeRDV = ?', [req.params.id], (err, results) => {
                if(err) throw err ;
                hdebut = results[0].HeureDébutRDV ;
                console.log('heure debut ', hdebut)
                con.query('select HeureFinRDV FROM `demanderdv` WHERE IdDemandeRDV = ?', [req.params.id], (err, results) => {
                    if(err) throw err ;
                    hfin = results[0].HeureFinRDV ;
                    console.log('heure fin ', hfin)
                    con.query('select Motif FROM demanderdv WHERE IdDemandeRDV = ?', [req.params.id], (err, results) => {
                        if (err) throw err ;
                        motif = results[0].Motif ;
                        console.log('motif :', motif)
                        con.query('select IdPatient FROM demanderdv WHERE IdDemandeRDV = ?', [req.params.id], (err, results) => {
                            if (err) throw err ;
                            idpatient = results[0].IdPatient;
                            console.log('id de patient : ', idpatient)
                            
                                con.query('INSERT INTO RendezVous (DateRDV ,HeureDébutRDV , HeureFinRDV , Motif , IdPatient , IdInfirmier) values ( ? , ? , ? , ? , ? , ?) ',[dateRDV , hdebut, hfin, motif ,idpatient , idInf], function(err, result){
                                    if(err) throw err ; 
                                    console.log('insertion terminé !');
                                })
                            con.query('select IdPatient FROM`demanderdv` WHERE IdDemandeRDV = ?', [req.params.id], function (err, result) {
                                if (err) throw err;
                                idp = result[0].IdPatient;
                                con.query('SELECT nom FROM patient WHERE IdPatient = ?', [idp], function (err, result) {
                                    if (err) throw err;
                                    nom = result[0].nom;
                                    con.query('SELECT prenom FROM patient WHERE IdPatient = ?', [idp], function (err, result) {
                                        if (err) throw err;
                                        prenom = result[0].prenom;
                                        const accepter = `<h2> Bonjour ${nom} ${prenom} </h2> <p> votre rendez-vous est accepté</p>`

                                        con.query('SELECT Email FROM patient WHERE IdPatient = ?', [idp], function (err, result) {
                                            if (err) throw err;
                                            email = result[0].Email;
                                            let transporter = nodemailer.createTransport({
                                                service: 'gmail',
                                                auth: {
                                                    type: 'OAuth2',
                                                    user: 'sahtechteam@gmail.com',
                                                    pass: 'Sahtech&99',
                                                    clientId: '1056334353973-jlhf0iv3ehte9r17nsgt99fk6c5tobdg.apps.googleusercontent.com',
                                                    clientSecret: 'AJFLB4fCH0VjmZz9SkO7W6Ca',
                                                    refreshToken: "1//04Wae0z0mo6t1CgYIARAAGAQSNwF-L9IrZB_YnN8vgkjal1zpLYV8U5z2rFx62dulCGDj8uPFcPEE-j2Dp8z4tKJ7iL7On7AvNPw"

                                                }
                                            })

                                            let mailOptions = {
                                                from: '"Team Sahtech" <sahtechteam@gmail.com>', // sender address
                                                to: email, // list of receivers
                                                subject: "accepter de rendez-vous avec ", // Subject line
                                                text: "rdv", // plain text body
                                                html: accepter, // html body
                                            };

                                            transporter.sendMail(mailOptions, function (err, data) {
                                                if (err) {
                                                    console.log("Error " + err);
                                                } else {
                                                    console.log("Email sent successfully");
                                                }
                                            });

                                        })
                                        con.query('DELETE FROM `demanderdv` WHERE IdDemandeRDV = ?', [req.params.id], (err, results) => {
                                            console.log('message from here')
                                            if (err) throw err;
                                            res.redirect(`/infirmier/${idInf}`);

                                        })
                                    })
                                })
                            })
                            
                        });
                        
                    
                    })
                }) 
            })
        }
    })
       
});




module.exports = infirmier;