var express = require('express');
var router = express.Router();
var con = require('../conn/conn');

router.post('', function (req, res) {
    var userid = req.params.id;
    console.log('this is the user id ',userid)
    var date = req.body.date;
    var hdebut = req.body.hdebut;
    var hfin = req.body.hfin;
    var txt = req.body.txt;

    var rdv = 'INSERT INTO rendezvous (dateRDV ,HeureDébutRDV , HeureFinRDV,Motif,IdPatient , IdMed) Values (? , ? , ? , ? , ? , ?)'
    var idmed = 'SELECT IdMedecin from medecin ;';
    con.query(idmed, function (err, result) {
        if (err) throw err;
        idmed = result[0].IdMedecin;
        console.log(idmed);
        con.query(rdv, [date, hdebut, hfin, txt, userid, idmed], function (err, result) {
            if (err) throw err;
            console.log('insertion de rdv est terminé', result);

        })
        con.query('SELECT nom FROM patient WHERE IdPatient = ?', [userid], function (err, result) {
            if (err) throw err;
            nom = result[0].nom;
            con.query('SELECT prenom FROM patient WHERE IdPatient = ?', [userid], function (err, result) {
                if (err) throw err;
                prenom = result[0].prenom;

                const modifier = `<h3>Bonjour ${nom} ${prenom} </h3><p>votre rendez-vous est programmer en <b>${date}</b> de <b> ${hdebut}</b> à <b> ${hfin}</b>  </p>`

                con.query('SELECT Email FROM patient WHERE IdPatient = ?', [userid], function (err, result) {
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
                            refreshToken: '1//04p1VDGRnXsdSCgYIARAAGAQSNwF-L9IrXhUWfbfzrFUfmoOGsYZhsBrUYhxd2BuAxzovJa-61OB2_7x3UiC_RgHJaTI15oeDJfo'
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
                })
            })
        })

    })
       
});

module.exports=router;
