var express = require('express');
const { UnavailableForLegalReasons } = require('http-errors');
var creerDossRouter = express.Router() ;
var con = require('../conn/conn');
var idp  ;
var iddep ;
var idant ;
// got home page 


//Handle POST request for User Registration
creerDossRouter.post('', function (req, res, next) {
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
    var hta = req.body.hta;
    var autre = req.body.autre;
    var psmed = req.body.psmed ;
    var app = req.body.app;
    var chole = req.body.chole;
    var pschirurg = req.body.pschirurg ;
    var allergique = req.body.allergique ;
    var cardio = req.body.cardio;
    var autres = req.body.autres ;
    var psfamille = req.body.psfamille;
    var toxic =req.body.toxique;
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
    var repos = req.body.repos;
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

    // return values true or false 
    
    if (hta ==  null){
        hta = false
    } else {hta = true}

    if (autre == null) {
        autre = false
    } else { autre = true }

    if (app == null) {
        app = false
    } else { app = true }

    if (chole == null) {
        chole = false
    } else { chole = true }

    if (cardio == null) {
        cardio = false
    } else { cardio = true }

    if (autres == null) {
        autres = false
    } else { autres = true }

    if (aff == null) {
        aff = false
    }
    else { aff = true }

    if (larmo == null) {
        larmo = false
    }
    else { larmo = true }

    if (douleur == null) {
        douleur = false
    }
    else { douleur = true }
    if (tdl = null) {
        tdl = false
    }
    else { tdl = true }
    if (siff == null) {
        siff = false
    }
    else { siff = true }
    if (angine == null) {
        angine = false
    }
    else { angine = true }
    if (ang == null) {
        ang = false
    }
    else { ang = true }

    if (muscu == null) {
        muscu = false
    } else { muscu = true }

    if (articu == null) {
        articu = false
    } else { articu = true }

    if (verte == null) {
        verte = false
    } else { verte = true }

    if (neuro == null) {
        neuro = false
    } else { neuro = true }

    if (toux == null) {
        toux = false
    } else { toux = true }

    if (expec == null) {
        expec = false
    } else { expec = true }

    if (tho == null) {
        tho = false
    } else { tho = true }

    if (palpi == null) {
        palpi = false
    } else { palpi = true }

    if (oedemes == null) {
        oedemes = false
    } else { oedemes = true }

    if (marche == null) {
        marche = false
    } else { marche = true }

    if (repos == null) {
        repos = false
    } else { repos = true }

    if (leffort == null) {
        leffort = false
    } else { leffort = true }

    if (permanents == null) {
        permanents = false
    } else { permanents = true }

    if (appetit == null) {
        appetit = false
    } else { appetit = true }

    if (transit == null) {
        transit = false
    } else { transit = true }

    if (selles == null) {
        selles = false
    } else { selles = true }

    if (pyrosis == null) {
        pyrosis = false
    } else { pyrosis = true }

    if (rectoreagies == null) {
        rectoreagies = false
    } else { rectoreagies = true }

    if (abdominales == null) {
        abdominales = false
    } else { abdominales = true }

    if (miction == null) {
        miction = false
    } else { miction = true }

    if (pollakiurie == null) {
        pollakiurie = false
    } else { pollakiurie = true }

    if (banaturie == null) {
        banaturie = false
    } else { banaturie = true }

    if (dysurie == null) {
        dysurie = false
    } else { dysurie = true }

    if (mictionnelles == null) {
        mictionnelles = false
    } else { mictionnelles = true }

    if (coliques == null) {
        coliques = false
    } else { coliques = true }

    if (regulier == null) {
        regulier = false
    } else { regulier = true }

    if (irregulier == null) {
        irregulier = false
    } else { irregulier = true }

    if (sommeil == null) {
        sommeil = false
    } else { sommeil = true }

    if (vertiges == null) {
        vertiges = false
    } else { vertiges = true }

    if (cephalees == null) {
        cephalees = false
    } else { cephalees = true }

    if (peur == null) {
        peur = false
    } else { peur = true }

    if (perte == null) {
        perte = false
    } else { perte = true }

    if (paresie == null) {
        paresie = false
    } else { paresie = true }

    if (paresthesie == null) {
        paresthesie = false
    } else { paresthesie = true }

    if (echymose == null) {
        echymose = false
    } else { echymose = true }

    if (tendances == null) {
        tendances = false
    } else { tendances = true }

    if (obesite == null) {
        obesite = false
    } else { obesite = true }

    if (maigraire == null) {
        maigraire = false
    } else { maigraire = true }


    var sql = 'select d.IdPatient from dossiermed d , patient p  where ( d.IdPatient = p.IdPatient );';

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result.length > 0) {
            console.log("ce patient déja a un dossier ")
            res.send('Cette personne a déja un dossier  ');
        
        } else { 
            var id = "select IdPatient from patient where email = ?";
                con.query(id, [email], function (err, result, fields) {
                    if (err) throw err;
                    if (result.length>0) {
                       idp = result[0].IdPatient;
                        console.log(idp); 
                    }
                    var ant = "insert into antecedant ( IdPatient , hta , autre , psMed , Appendicectomie , Cholecystectomie , psChirurg , Allergique , Cardiopathie , autres , psFamille , Toxiques) values( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? ); ";
                    con.query(ant, [idp, hta , autre, psmed ,app ,chole ,pschirurg ,allergique , cardio , autres ,psfamille ,toxic ], function(err , result , feilds){
                        if(err) throw err ;
                        console.log("insertion terminé !")
                    })

                    var dep = "insert into depistage (IdPatient ,affectation ,Larmolement ,Douleurs ,Taches ,Siffelements , Angines ,Epistaxis ,musculaires  ,articulaires ,vértébrales  ,Neurologiques ,Toux  ,Expectorations ,thoraciques ,Palpitation ,oedèmes , marche  ,repos ,effort ,permanents ,Appétit  ,Transit ,Selles , Pyrosis ,Rectoreagies  ,abdominales ,Miction  ,Pollakiurie  ,Banaturie  ,Dysurie , Ballures  ,Coliques ,CycleRegulier ,CycleIrregulier ,Sommeil  ,Vertiges ,Céphalées  , Peurvide , Perteconnai , Parésie  , Paresthésie ,Echymose ,hémorragies ,Obésité , Maigraire )values ( ? , ? ,? ,? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? );";
                    con.query(dep, [ idp,aff ,larmo , douleur , tdl ,siff , angine,ang ,muscu ,articu ,verte,neuro ,toux , expec , tho,palpi ,oedemes ,marche ,repos ,leffort ,permanents ,appetit ,transit, selles,pyrosis ,rectoreagies , abdominales ,miction ,pollakiurie,banaturie , dysurie, mictionnelles ,coliques , regulier,irregulier, sommeil , vertiges, cephalees ,peur ,perte, paresie,paresthesie ,echymose , tendances , obesite ,maigraire] , function(err , result , fields){
                        if (err) throw err;
                        console.log("tous sont enregistré !")
                    })

                    var idant = "select IdAnt from antecedant where IdPatient = ?";
                    con.query(idant , [idp], function(err ,result , fields){
                        if (err) throw err ;
                        if(result.length >0){
                            idant = result[0].IdAnt;
                            console.log(idant);
                        }
                    })

                    var iddep = " select Iddep from depistage where IdPatient = ?";
                    con.query(iddep , [idp],function(err,result, feilds){
                        if (err) throw err;
                        if (result.length>0) {
                            iddep = result[0].Iddep ;
                            console.log(iddep);
                        }
                        var sqlinsert = "insert into dossiermed (IdPatient ,poids , taille , IMC , nss , grs , categorie , idAnt , Iddep ) values ( ? , ? , ? , ? , ? , ? , ? , ? , ? )";
                        con.query(sqlinsert, [idp, poids, taille, imc, nss, grs , categorie , idant , iddep], function (err, result, fields) {
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



