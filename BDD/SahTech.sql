use biat4foatclkn4ba8g1z ; 
drop table patient ;
create table utilisateur ( email varchar(255) primary key ,
 MotPasse varchar(255) ,
 active tinyint default 1 
 ) ;
 
    
    CREATE TABLE medecin ( IdMedecin int primary key not null auto_increment,
    nom varchar (40),
    prenom varchar(40),
    NumTel int,
    DateNaissance date,
    Adress varchar(40),
    Email varchar(40) unique,
    foreign key(Email)references utilisateur (email) );
    
    create table dossiermed (
    IdDoss int primary key not null auto_increment ,
    IdPatient int not null unique ,
    foreign key (IdPatient) references patient (IdPatient ) ,
    poids float ,
    taille float CHECK( taille > 0 && taille < 200) ,
    IMC float,
    nss varchar(10),
    grs varchar(10),
	IdAnt int not null ,
    foreign key (IdAnt ) references antecedant(IdAnt),
	Iddep int not null ,
    foreign key (Iddep ) references depistage(Iddep),
    categorie enum('etudiant','ATS','enseignant')
    );
    
    
create table adminstrateur ( IdAdmin int primary key not null auto_increment, 
nom varchar (40),
prenom varchar(40),
NumTel int,
Adress varchar(40),
DateNaissance date ,
Email varchar(40) unique,
foreign key(Email)references utilisateur (email)  );

create table assistantadmin ( IdAssistant int primary key not null auto_increment, 
nom varchar (40),
prenom varchar(40),
NumTel int,
Adress varchar(40),
DateNaissance date ,
Email varchar(40) unique ,
foreign key(Email)references utilisateur (email) );

create table infirmier( IdInfirmier int primary key not null auto_increment, 
 nom varchar (40),
prenom varchar(40),
NumTel int,
Adress varchar(40),
DateNaissance date ,
Email varchar(40) unique ,
foreign key(Email)references utilisateur (email) );

create table RendezVous (IdRDV int primary key not null auto_increment, 
DateRDV date ,
HeureDébutRDV time, 
HeureFinRDV time,
Motif varchar(40),
IdPatient int not null,
foreign key (IdPatient) references patient (Idpatient),
IdInfirmier int  ,
foreign key (IdInfirmier) references infirmier (IdInfirmier), 
IdMed int ,
foreign key (IdMed ) references medecin(IdMedecin));


create table Orientation (idoriantation int not null auto_increment,
DateOrientation date ,
DescriptionOrt varchar(300),
idmed int not null,
 idpatient int not null,
 foreign key (idpatient) references parient (IdPatient),
 foreign key (idmed) references medecin (IdMedecin)); 

create table CertificatMdicale (IdCertificatMedicale int primary key auto_increment,
 DateCertificat date ,
 DescriptionCertf varchar(300),
 IdPatient int not null,
 foreign key (IdPatient) references parient (IdPatient),
 IdMed int not null,
 foreign key (IdMed) references medecin (IdMedecin));

create table Ordonnance (IdOrdonnace int primary key auto_increment,
 DateORD date,
 IdPatient int not null,
 IdMed int not null ,
 description varchar(10000),
 foreign key (IdPatient) references parient (IdPatient),
 foreign key (IdMed) references medecin (IdMedecin));
 
 create table certificatmdicale (idcertificatmedicale int primary key auto_increment,
 datefin date,
 datedebut date ,
 type varchar(20),
 idpatient int not null,
 idmed int not null ,
 description varchar(10000),
 foreign key (idpatient) references parient (IdPatient),
 foreign key (idmed) references medecin (IdMedecin));
create table demandesins ( 
    nom varchar (40),
    prenom varchar(40),
    numtel int,
    wilaya varchar(20),
    sexe varchar(10),
    datenaissance date,
    Adress varchar(40),
    email varchar (40) unique ,
    mdp varchar(20),
    foreign key(Email)references utilisateur (email));

create table evacuation (ideva int primary key auto_increment,
idpat int not null ,
idmed int not null,
date date ,
description varchar(10000),
foreign key (idpatient) references parient (IdPatient),
foreign key (idmed) references medecin (IdMedecin));

create table examenclinique (idexmn int primary key auto_increment,
motif varchar(20),
ta varchar(20),
fc varchar(20),
spo varchar(20),
glycemie varchar(20),
synthese varchar(20),
idpat int not null ,
idmed int not null ,
foreign key (idpatient) references parient (IdPatient),
foreign key (idmed) references medecin (IdMedecin));


create table  Rapport (IdRapport int primary key auto_increment auto_increment,
 DateRapport datetime,
 idmed int not null,
 idpatient int not null,
 text varchar (10000) ,
 foreign key (idpatient) references parient (IdPatient),
 foreign key (idmed) references medecin (IdMedecin));

create table Consultation (IdConsultation int primary key auto_increment,
 DateConsultation datetime ,
 IdMed int not null ,
 IdPatient int not null ,
 foreign key (IdPatient) references parient (IdPatient),
 foreign key (IdMed) references medecin (IdMedecin)); 


create table antecedant ( idant int primary key auto_increment ,
idpatient int not null unique,
foreign key (IdPatient) references patient (IdPatient),
hta boolean  ,
Diabète boolean ,
autre boolean  ,
Remarque varchar(255),
Appendicectomie  boolean ,
Cholecystectomie boolean  ,
remarque1 varchar(255),
Allergique varchar(255) ,
Cardiopathie  boolean  ,
autres boolean ,
remarque2 varchar(255),
Toxiques varchar(255));

create table depistage ( Iddep int primary key auto_increment ,
idpatient int not null unique,
foreign key (IdPatient) references patient (IdPatient),
affectation boolean,
Larmolement boolean,
Douleurs boolean,
Taches boolean,
Siffelements boolean, 
Angines boolean, 
Epistaxis boolean,
musculaires  boolean,
articulaires boolean,
vértébrales  boolean,
Neurologiques boolean,
Toux  boolean,
Expectorations boolean,  
thoraciques boolean,
Palpitation boolean,
oedèmes boolean,
marche  boolean,
repos boolean,
effort  boolean,
permanents boolean,
Appétit  boolean,
Transit boolean,
Selles  boolean,
Pyrosis boolean,
Rectoreagies  boolean,
abdominales boolean,
Miction  boolean,
Pollakiurie  boolean,
Banaturie  boolean,
Dysurie boolean,
Ballures   boolean,
Coliques boolean,
CycleRegulier boolean,
CycleIrregulier boolean,
Sommeil  boolean,
Vertiges boolean,  
Céphalées  boolean,
Peurvide boolean,
Perteconnai  boolean,
Parésie  boolean,
Paresthésie boolean,
Echymose  boolean,
hémorragies boolean,
Obésité boolean,
Maigraire boolean);

create table demanderdv (IdDemandeRDV int primary key not null , 
DateRDV date ,
HeureDébutRDV time, 
HeureFinRDV time,
Motif varchar(40),
IdPatient int not null,
foreign key (IdPatient) references patient (IdPatient));


CREATE VIEW view_ant AS
SELECT antecedant.*, dossiermed.IdDoss  FROM antecedant
LEFT OUTER JOIN dossiermed
ON antecedant.IdAnt = dossiermed.IdAnt ;

CREATE VIEW myview AS
SELECT patient.*, dossiermed.iddoss  FROM patient
LEFT OUTER JOIN dossiermed
ON patient.IdPatient = dossiermed.IdPatient ;

CREATE VIEW vassisstant AS
SELECT utilisateur.active, assisstantadmin.email  FROM utilisateur
LEFT OUTER JOIN assisstantadmin
ON utilisateur.email = assisstantadmin.email where utilisateur.email = assisstantadmin.email ;

CREATE VIEW vinfermier AS
SELECT utilisateur.active, infirmier.email  FROM utilisateur
LEFT OUTER JOIN infirmier
ON utilisateur.email = infirmier.email where utilisateur.email = infirmier.email ;

CREATE VIEW vmedecin AS
SELECT utilisateur.active, medecin.email  FROM utilisateur
LEFT OUTER JOIN medecin
ON utilisateur.email = medecin.email where utilisateur.email = medecin.email ;

CREATE VIEW vpatient AS
SELECT utilisateur.active, patient.email  FROM utilisateur
LEFT OUTER JOIN patient
ON utilisateur.email = patient.email where utilisateur.email = patient.email ;

CREATE VIEW demande AS
SELECT demanderdv.*, patient.nom , patient.prenom , patient.categorie  FROM demanderdv
LEFT OUTER JOIN patient
ON patient.IdPatient = demanderdv.IdPatient ;

CREATE VIEW rdv AS
SELECT rendezvous.*, patient.nom , patient.prenom , patient.categorie  FROM rendezvous
LEFT OUTER JOIN patient
ON patient.IdPatient = rendezvous.IdPatient ;
