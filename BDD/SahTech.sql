create table utilisateur ( email varchar(255) primary key ,
 MotPasse varchar(255) ) ;
 
CREATE TABLE patient ( IdPatient int primary key not null auto_increment,
    nom varchar (40),
    prenom varchar(40),
    NumTel int,
    wilaya varchar(20),
    sexe varchar(10),
    DateNaissance date,
    Adress varchar(40),
    Email varchar (40) unique ,
    foreign key(Email)references utilisateur (email));
    
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
Email varchar(40) unique,
foreign key(Email)references utilisateur (email)  );

create table assistantAdmin ( IdAssistant int primary key not null auto_increment, 
nom varchar (40),
prenom varchar(40),
NumTel int,
Email varchar(40) unique ,
foreign key(Email)references utilisateur (email) );

create table infirmier( IdInfirmier int primary key not null auto_increment, 
 nom varchar (40),
prenom varchar(40),
NumTel int,
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

/* mzl ma nkhdmo bih f bdd  */
create table Statistique (IdStat int primary key auto_increment, 
 Date_Statistique datetime,
 IdMed int not null ,
 foreign key (IdMed ) references medecin(IdMedecin),
 IdAssistantAdmin int not null ,
 foreign key (IdAssistantAdmin ) references assistantAdmin(IdAssistant)
 );
 /* hada tan ma khdmnach bih je pense s9si wafaa */
 create table LigneOrd (IdOrdonnace int primary key,
 IdMed int not null ,
 foreign key (IdMed) references medecin (IdMedecin));
/* Aussi mm chose */
create table Médicament (IdMédicament int primary key ,
categorie varchar(100),
NomMedicament varchar(100));

create table Orientation (IdOriantation int not null auto_increment,
DateOrientation date ,
DescriptionOrt varchar(300),
IdMed int not null,
 IdPatient int not null,
 foreign key (IdPatient) references parient (IdPatient),
 foreign key (IdMed) references medecin (IdMedecin)); 

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
 foreign key (IdPatient) references parient (IdPatient),
 foreign key (IdMed) references medecin (IdMedecin));

create table  Rapport (IdRapport int primary key auto_increment auto_increment,
 DateRapport datetime,
 IdMed int not null,
 IdPatient int not null,
 foreign key (IdPatient) references parient (IdPatient),
 foreign key (IdMed) references medecin (IdMedecin));

create table Consultation (IdConsultation int primary key auto_increment,
 DateConsultation datetime ,
 IdMed int not null ,
 IdPatient int not null ,
 foreign key (IdPatient) references parient (IdPatient),
 foreign key (IdMed) references medecin (IdMedecin)); 


create table antecedant ( IdAnt int primary key auto_increment ,
IdPatient int not null unique,
foreign key (IdPatient) references patient (IdPatient),
hta boolean  ,
Diabète boolean ,
autre boolean  ,
psMed varchar(255),
Appendicectomie  boolean ,
Cholecystectomie boolean  ,
psChirurg varchar(255),
Allergique varchar(255) ,
Cardiopathie  boolean  ,
autres boolean ,
psFamille varchar(255),
Toxiques varchar(255));

drop table depistage;
create table depistage ( Iddep int primary key auto_increment ,
IdPatient int not null unique,
foreign key (IdPatient) references patient (IdPatient),
affectation boolean,
Larmolement boolean,
Douleurs boolean,
Taches boolean,
Siffelements boolean, 
Angines boolean,
répétées boolean,  
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


CREATE VIEW view_ant AS
SELECT antecedant.*, dossiermed.IdDoss  FROM antecedant
LEFT OUTER JOIN dossiermed
ON antecedant.IdAnt = dossiermed.IdAnt ;

CREATE VIEW dossmed AS
SELECT patient.*, dossiermed.IdDoss ,dossiermed.categorie  FROM patient
LEFT OUTER JOIN dossiermed
ON patient.IdPatient = dossiermed.IdPatient ;

create table demanderdv (IdDemandeRDV int primary key not null , 
DateRDV date ,
HeureDébutRDV time, 
HeureFinRDV time,
Motif varchar(40),
IdPatient int not null,
foreign key (IdPatient) references patient (IdPatient));

CREATE VIEW demande AS
SELECT demanderdv.*, patient.nom , patient.prenom , patient.categorie  FROM demanderdv
LEFT OUTER JOIN patient
ON patient.IdPatient = demanderdv.IdPatient ;

CREATE VIEW rdv AS
SELECT rendezvous.*, patient.nom , patient.prenom , patient.categorie  FROM rendezvous
LEFT OUTER JOIN patient
ON patient.IdPatient = rendezvous.IdPatient ;
