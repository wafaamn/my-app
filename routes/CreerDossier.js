var express = require('express');
var creerDossRouter = express.Router() ;
var con = require('../conn/conn');
var idp , iddep ;
// got home page 


//Handle POST request for User Registration
creerDossRouter.post('/creer', function (req, res, next) {
    console.log("message !");

    var nom = req.body.nom;
    var email = req.body.email;
    var prenom = req.body.prenom;
    var nss = req.body.nss ;
    var categorie = req.body.categorie;
    var grs =req.body.grs;
    var poids = req.body.poids;
    var taille = req.body.taille;
    var imc = req.body.imc ;
    var aff = req.body.aff;
    var larmo = req.body.larmo; 
    var douleur = req.body.douleur;
    var tdl = req.body.tdl;
    var siff = req.body.siff;
    var angine = req.body.angine;
    var ang = req.body.ang ;
    var muscu = req.body.muscu;
    var articu = req.body.articu;
    var verte = req.body.verte;
    var neuro = req.body.neuro;
    var toux = req.body.toux;
    var expec = req.body.expec;
    var tho = req.body.tho;
    var palpi = req.body.palpi;
    var oedemes = req.body.oedemes;
    var marche =req.body.marche;
    var ropos = req.body.ropos;
    var leffort = req.body.leffort;
    var permanents = req.body.permannent;
    var appetit = req.body.appetit;
    var transit = req.body.transit;
    var selles = req.body.selles;
    var pyrosis = req.body.pyrosis;
    var rectoreagies = req.body.rectoreagies;
    var abdominales = req.body.abdominales;
    var miction = req.body.miction;
    var pollakiurie = req.body.pollakiurie;
    var banaturie = req.body.banaturie;
    var dysurie = req.body.dysurie;
    var mictionnelles = req.body.mictionnelles;
    var coliques = req.body.coliques;
    var regulier = req.body.regulier;
    var irregulier = req.body.irregulier;
    var sommeil = req.body.sommeil;
    var vertiges = req.body.vertiges;
    var cephalees = req.body.cephalees;
    var peur= req.body.peur;
    var perte = req.body.perte;
    var paresie = req.body.paresie;
    var paresthesie = req.body.paresthesie;
    var echymose = req.body.echymose;
    var tendances = req.body.tendances;
    var obesite = req.body.obesite;
    var maigraire = req.body.maigraire;

    var sql = 'select d.IdPatient from dossiermed d , patient p  where ( d.IdPatient = p.IdPatient );';

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
            console.log("ce patient déja a un dossier ")
            res.send('Cette personne a déja un dossier  ');
        
        }else { 
            var id = "select IdPatient from patient where email = ?";
                con.query(id, [email], function (err, result, fields) {
                    if (err) throw err;
                    if (result.length>0) {
                       idp = result[0].IdPatient;
                        console.log(idp); 
                    }
                    var dep = "insert into depistage (IdPatient ,affectation ,Larmolement ,Douleurs ,Taches ,Siffelements , Angines , répétées ,Epistaxis ,musculaires  ,articulaires ,vértébrales  ,Neurologiques ,Toux  ,Expectorations ,thoraciques ,Palpitation ,oedèmes , marche  ,repos ,effort ,permanents ,Appétit  ,Transit ,Selles , Pyrosis ,Rectoreagies  ,abdominales ,Miction  ,Pollakiurie  ,Banaturie  ,Dysurie , Ballures  ,Coliques ,CycleRegulier ,CycleIrregulier ,Sommeil  ,Vertiges ,Céphalées  , Peurvide , Perteconnai , Parésie  , Paresthésie ,Echymose ,hémorragies ,Obésité , Maigraire )values ( ? , ? ,? ,? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? );";
                    con.query(dep, [ idp,aff ,larmo , douleur , tdl ,siff , angine,ang ,muscu ,articu ,verte,neuro ,toux , expec , tho,palpi ,oedemes ,marche ,ropos ,leffort ,permanents ,appetit ,transit, selles,pyrosis ,rectoreagies , abdominales ,miction ,pollakiurie,banaturie , dysurie, mictionnelles ,coliques , regulier,irregulier, sommeil , vertiges, cephalees ,,peur ,perte, paresie,paresthesie ,echymose , tendances , obesite ,maigraire] , function(err , result , fields){
                        if (err) throw err;
                        console.log("tous sont enregistré !")
                    })
                    var iddep = " select Iddep from depistage patient where depistage.IdPatient = ?"
                    con.query(iddep , [idp],function(err,result, feilds){
                        if (err) throw err;
                        if (result.length>0) {
                            iddep = result[0].Iddep ;
                            console.log(iddep);
                        }
                        var sqlinsert = "insert into dossiermed (IdPatient ,poids , taille , IMC , nss , categorie , grs, Iddep ) values ( ? , ? , ? , ? , ? , ? , ? , ? )";
                        con.query(sqlinsert, [idp, poids, taille, imc, nss, grs], function (err, result, fields) {
                            if (err) throw err;
                            console.log("creation est terminé ! ");
                            res.send('creation est terminé ');

                    });
                    
                    });
                });
            

            }
    });
});

module.exports = creerDossRouter ;



