var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var con = require('../conn/conn');
var nodemailer = require('nodemailer');
const { response } = require('express');

 

/* GET home page. 
router.get('/home', function(req, res, next) {
  if(req.session.flag == 1){
    req.session.destroy();
    res.render('loginn', { title: 'CodeLanguage', message : 'Email Already Exists' , flag : 1});
  }
  else if(req.session.flag == 2){
    req.session.destroy();
    res.render('index', { title: 'CodeLanguage', message : 'Registration Done. Please Login.', flag : 0});
  }
  else if(req.session.flag == 3){
    req.session.destroy();
    res.render('index', { title: 'CodeLanguage', message : 'Confirm Password Does Not Match.', flag : 1});
  }
  else if(req.session.flag == 4){
    req.session.destroy();
    res.render('loginn', { title: 'CodeLanguage', message : 'Incorrect Email or Password.', flag : 1 });
  }
  else{
    res.render('index', { title: 'CodeLanguage' });
  }
   
});*/

//Handle POST request for User Registration
/*router.post('/auth_reg', function(req, res, next){

  var fullname = req.body.fullname;
  var email = req.body.email;
  var password = req.body.password;
  var cpassword = req.body.cpassword;

  if(cpassword == password){

    var sql = 'select * from user where email = ?;';

    con.query(sql,[email], function(err, result, fields){
      if(err) throw err;

      if(result.length > 0){
        req.session.flag = 1;
        res.redirect('/');
      }else{
;
        var hashpassword = bcrypt.hashSync(password, 10);
        var sql = 'insert into user(fullname,email,password) values(?,?,?);';

        con.query(sql,[fullname,email, hashpassword], function(err, result, fields){
          if(err) throw err;
          req.session.flag = 2;
          res.redirect('/');
        });
      }
    });
  }else{
    req.session.flag = 3;
    res.redirect('/');
  }
});*/

router.get('/', function(request, response) {
response.render('home')
});
router.get('/deconnecter', function(request, response) {
  response.render('login')
  });
  router.get('/modifier/deconnecter', function(request, response) {
    response.render('login')
    });
router.get('/inscrire', function(request, response) {
  response.render('inscription-patient')
  });
  router.post('/inscrire',function(req,res){
    console.log("helo");
    var nom=req.body.nom,
        prenom=req.body.prénom,
        date=req.body.birthday,
        sexe=req.body.homme,
        sexe1=req.body.femme,
        lieu=req.body.lieux,
        num=req.body.num_tel,
        categorie=req.body.catégorie,
        adresse=req.body.text,
        mpasse=req.body.mot_de_passe;
    console.log(nom);
    console.log(sexe);
    console.log(adresse);
    console.log(mpasse);
    con.query("insert into demandesins (nom,prenom,numtel,wilaya,datenaissance,email,categorie,mdp)values(?,?,?,?,?,?,?,?)",[nom,prenom,num,lieu,date,adresse,categorie,mpasse],function(err,result){
      if(err) throw err;
      console.log("inseré")
    console.log(sexe);
    if ( typeof sexe !== 'undefined'){
      con.query("update demandesins set sexe=? where email=?",[sexe,adresse],function(err,result){
        if (err) throw err;
        console.log("inseré1")
      })
    }
      else con.query("update demandesins set sexe=? where email=?",[sexe1,adresse],function(err,result){
        if (err) throw err;
        console.log("inseré2");
        
      })
      
    
  })
  res.send('vos informations sont bien envoyées');
  });
  router.get('/connect', function(request, response) {
    response.render('login')
    });
//Handle POST request for User Login
router.post('/auth',function(request,response){

  var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		con.query('SELECT * FROM utilisateur WHERE email = ? AND MotPasse = ?', [username, password], function(error,results,fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
        con.query('select * from medecin where email= ?',[username],function(err,result){
          if (result.length>0){
            response.redirect('/dossiers');
          };
        })

            con.query('select * from adminstrateur where email= ?',[username],function(err,result){
              if (result.length>0){
                response.redirect('/admin');
          };
        })
       // response.render('interfacemedecin');
			} else {
       
			response.send('Incorrect Username and/or Password!');
			}			
		//	response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
router.post('/modifier/auth',function(request,response){

  var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		con.query('SELECT * FROM utilisateur WHERE email = ? AND MotPasse = ?', [username, password], function(error,results,fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
        con.query('select * from medecin where email= ?',[username],function(err,result){
          if (result.length>0){
            response.redirect('/dossiers');
          };
        })

            con.query('select * from adminstrateur where email= ?',[username],function(err,result){
              if (result.length>0){
                response.redirect('/admin');
          };
        })
       // response.render('interfacemedecin');
			} else {
       
			response.send('Incorrect Username and/or Password!');
			}			
		//	response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

router.get('/medecin', function(request, response) {
	if (request.session.loggedin) {
	//	response.send('Welcome back, ' + request.session.username + '!');
		response.render('interface-medecin');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});
router.get('/admin',function(req,res){
  res.render('interface-admin');
  res.end();
});
router.get('/creer' ,function(req,res){
  var sql='SELECT * FROM view_ant where iddoss=1';
  con.query(sql, function (err, data, fields) {
    console.log(data);
  if (err) throw err;
  res.render('dossier-medical',{ title:'dossier' , userData:data});
});
});
router.get('/examen' ,function(req,res){
  res.render('examen-medical');
});
router.get('/dossiers' ,function(req,res){
var sql='SELECT * FROM myview';
con.query(sql, function (err, data, fields) {
if (err) throw err;
console.log(data);
res.render('Dossiers-medicaux', { title: 'User List', userData: data});
});

});   
router.get('/Consulter/:id',function(req,res){
  var idd=req.params.id;
  // first query
var query1=function(callback)
{
con.query('select * from myview where idpatient=?',[idd],function(err,result,fields)
{
  if(err) throw err;
  console.log(result);
return callback(result);
});

}
// query2
var query2=function(callback)
{
con.query('select * from dossiermed where idpatient=?',[idd] , function (err,result, fields) {
if (err) throw err;
console.log(result);
return callback(result);
});

}
// query3
var query3=function(callback)
{
con.query('select * from antecedant where idpatient=?',[idd] , function (err,result, fields) {
if (err) throw err;
console.log(result);
return callback(result);
});


}  
// render to same page
query1(function(result){
query2(function(result1){
query3(function(result2){
res.render('affichage-dossier', { title: 'User List', userData: result, userData2: result1, userData3: result2});
});

});
});

});
/*router.post('/find', (req, res) => {

  var searchTerm = req.body.search;

  console.log(searchTerm);

  con.query('SELECT * FROM view WHERE nom = ?', [searchTerm], (err, rows) => {

      if (!err) {
          res.render('Dossiers-medicaux', { rows });
      } else {
          console.log(err);
      }

      console.log('the data from  view : \n', rows);
  });


});*/
router.get('/modifier/:id' ,function(req,res){
  var idpat=req.params.id;
  
 // first query
 var query1=function(callback)
 {
 con.query('select * from patient where idpatient=?',[idpat],function(err,result,fields)
 {
   if(err) throw err;
   console.log(result);
 return callback(result);
 });
 
 }
 // query2
 var query2=function(callback)
 {
 con.query('select * from dossiermed where idpatient=?',[idpat] , function (err,result, fields) {
 if (err) throw err;
 console.log(result);
 return callback(result);
 });
 
 }
 // query3
 var query3=function(callback)
 {
 con.query('select * from antecedant where idpatient=?',[idpat] , function (err,result, fields) {
 if (err) throw err;
 console.log(result);
 return callback(result);
 });
 
 
 }  
 // query4
 var query4=function(callback)
 {
 con.query('select * from depistage where idpatient=?',[idpat] , function (err,result, fields) {
 if (err) throw err;
 console.log(result);
 return callback(result);
 });
 
 
 }  
 // render to same page
 query1(function(data){
 query2(function(data1){
 query3(function(data2){
 query4(function(data3){
 res.render('Modifier-dossier', { title: 'User List', userData:data, userData2: data1, userData3: data2 ,userData4:data3});
 });
 });
 });
 });
 
  
});
router.post('/modifier/:id',function(req,res){
  var idpat=req.params.id;
  /*info dossiermed starts*/
  var  grs=req.body.grs,
        nss=req.body.nss,
        poids=req.body.poids,
        taille=req.body.taille,
        imc=req.body.imc;

/*ends*/
/*antecedant*/
  var hta=req.body.hta,
      autres=req.body.autres,
      re=req.body.remarque,
      app=req.body.app,
      chole=req.body.chole,
      re1=req.body.remarque1,
      allgq=req.body.allgq,
      cardio=req.body.cardio,
      autres1=req.body.autres1,
      re2=req.body.remarque2,
      tox=req.body.tox;
  
  if (hta ==  null){
    hta = false
} else {hta = true};
if (autres ==  null){
autres = false
} else {autres = true}
if (app==  null){
  app = false
} else {app = true};
if (chole ==  null){
  chole = false
} else {chole = true};
if (cardio==  null){
  cardio= false
} else {cardio = true};
if (autres1 ==  null){
  autres1 = false
} else {autres1 = true}
/*antecedant*/
var aff = req.body.aff,
     larmo = req.body.larmo,
    douleur = req.body.douleur,
    tdl = req.body.tdl,
    siff = req.body.siff,
   angine = req.body.angine,
     ang = req.body.ang ,
     muscu = req.body.muscu,
     articu = req.body.articu,
     verte = req.body.verte,
     neuro = req.body.neuro,
    toux = req.body.toux,
    expec = req.body.expec,
     tho = req.body.tho,
     palpi = req.body.palpi,
     oedemes = req.body.oedemes,
     marche =req.body.marche,
     repos = req.body.repos,
     leffort = req.body.leffort,
     permanents = req.body.permanents,
     appetit = req.body.appetit,
     transit = req.body.transit,
     selles = req.body.selles,
     pyrosis = req.body.pyrosis,
     rectoreagies = req.body.rectoreagies,
     abdominales = req.body.abdominales,
     miction = req.body.miction,
     pollakiurie = req.body.pollakiurie,
     banaturie = req.body.banaturie,
    dysurie = req.body.dysurie,
     mictionnelles = req.body.mictionnelles,
     coliques = req.body.coliques,
     regulier = req.body.Regulier,
     irregulier = req.body.irregulier,
     sommeil = req.body.sommeil,
     vertiges = req.body.vertiges,
     cephalees = req.body.cephalees,
     peur= req.body.peur,
     perte = req.body.perte,
     paresie = req.body.paresie,
     paresthesie = req.body.paresthesie,
     echymose = req.body.echymose,
     tendances = req.body.tendances,
     obesite = req.body.obesite,
     maigraire = req.body.maigraire;


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
  } else { maigraire = true };
console.log(hta);
 console.log(grs);
 console.log(regulier);
  con.query('update dossiermed set grs=?,nss=? ,poids=?, taille=?, imc=? where idpatient=?',[grs,nss,poids,taille,imc,idpat],function(err,data,fields)
  {
    if(err) throw err;
    console.log("updated")
});                                                                                                          
con.query('update antecedant set hta=?,autre=?,remarque=?, Appendicectomie=?,Cholecystectomie=?,remarque1=?,Allergique=?,Cardiopathie=?,autres=?,remarque2=?,Toxiques=? where idpatient=?',[hta,autres,re,app,chole,re1,allgq,cardio,autres1,re2,tox,idpat],function(err,data,fields)
  {
    if(err) throw err;
    console.log("updated");
});
con.query('update depistage set  affectation=?,Larmolement=?,Douleurs=?,Taches=?,Siffelements=?,Angines=?,Epistaxis=?,musculaires=?,articulaires=?,vértébrales=?,Neurologiques=?,Toux=?,Expectorations=?,thoraciques=?,Palpitation=?,oedèmes=?,marche=?,repos=?,effort=?,permanents=?,Appétit=?,Transit=?,selles=?,Pyrosis=?,Rectoreagies=?,abdominales=?,Miction=?,Pollakiurie=?,Banaturie=?,Dysurie=?,Ballures=?,Coliques=?,CycleRegulier=?,CycleIrregulier=?,Sommeil=?,Vertiges=?,Céphalées=?,Peurvide=?,Perteconnai=?,Parésie=?,Paresthésie=?,Echymose=?,hémorragies=?,Obésité=?,Maigraire=? where idpatient=?'
,[aff ,larmo , douleur , tdl ,siff , angine,ang ,muscu ,articu ,verte,neuro ,toux , expec , tho,palpi ,oedemes ,marche ,repos ,leffort ,permanents ,appetit ,transit, selles,pyrosis ,rectoreagies , abdominales ,miction ,pollakiurie,banaturie , dysurie, mictionnelles ,coliques , regulier,irregulier, sommeil , vertiges, cephalees ,peur ,perte, paresie,paresthesie ,echymose , tendances , obesite ,maigraire,idpat],function(err,data,fields)
  {
    if(err) throw err;
    console.log("upd");
    res.status(204).send();
});
});
router.get('/examenclinique' ,function(req,res){
  res.render('examen-clinique')
});
router.get('/rapport' ,function(req,res){
  res.render('rapport-medical')
});
router.get('/ordonnance' ,function(req,res){
  res.render('ordonnance')
});
router.get('/evacuation' ,function(req,res){
  res.render('evacuation')
});
router.get('/certificat' ,function(req,res){
  res.render('certificat-medical')
});
router.get('/orientation' ,function(req,res){
  res.render('orientation')
});
 /*** Interface admin starts */
 router.get("/patient",function(req,res){
   con.query('select * from demandesins ',function(err,data){
     if (err) throw err;
     console.log(data)
  
   res.render("patient",{title: 'Liste-demandes',userData:data})
   })
 });
 router.post('/accepter/:id',function(req,res){
  var email=req.params.id;
console.log(email);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sahtechteam@gmail.com',
      pass: 'Sahtech&99'
    }
  });
  
  var mailOptions = {
    from: 'sahtechteam@gmail.com',
    to:email,
    subject: 'Team Sah-Tech',
    text: 'Bienvenue sur notre platforme Sah-Tech,vous pouvez connecter maintenant .'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 
  console.log(email)
   con.query('insert into utilisateur(email,motpasse) select email,mdp from demandesins where email=?',[email],function(err,result){
    if (err) throw err;
     con.query('insert into patient(nom,prenom,numtel,wilaya,sexe,datenaissance,email) select nom,prenom,numtel,wilaya,sexe,datenaissance,email from demandesins where email=?',[email],function(err,result){
    if (err) throw err;
  });
  con.query("select idpatient from patient where email=?",[email],function(err,result){
 idpat=result[0].idpatient;
 console.log(idpat);
  con.query('insert into antecedant(idpatient) values(?)',[idpat],function(err,result){
    if (err) throw err;
  })
  con.query('select idant from antecedant where idpatient=?',[idpat],function(err,result1){
    if (err) throw err;
    idant=result1[0].idant
  con.query('insert into depistage(idpatient) values(?)',[idpat],function(err,result){
    if (err) throw err;
  con.query('select iddep from depistage where idpatient=?',[idpat],function(err,result2){
    if (err) throw err;
    iddep=result2[0].iddep;
    con.query('insert into dossiermed (idpatient,idant,iddep) values(?,?,?)',[idpat,idant,iddep],function(err,result){
      if (err) throw err;
      console.log("helo")
    })
    con.query("select categorie from demandesins where email=?",[email],function(err,result3){
      catg=result3[0].categorie;
      if (err) throw err;
    con.query('update dossiermed set categorie=? where idpatient',[catg,idpat],function(err,result){
      if (err) throw err;
    })
    res.status(204).send();
    console.log('insertion utilisateur terminé!!')
  })
})
  })
})
})
 });
});
/* router.post('/accepter/:id',function(res,res){
   var email=req.params.id;
  con.query('insert into patient(nom,prenom) select nom,prenom from demandesins where email=?',[email],function(err,result){
    if (err) throw err;
    console.log('copiage')
  })
 });*/

 /*** Interface admin ends */
//Route For Home Page
//router.get('/home', function(req, res, next){
  //res.render('home', {message : 'Welcome, ' + req.session.email});
//});

//router.get('/logout', function(req, res, next){
  //if(req.session.email){
    //req.session.destroy();
    //res.redirect('/');
  //}
//})

module.exports = router;
