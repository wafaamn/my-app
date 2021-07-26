create table utilisateur ( email varchar(255) primary key ,
 MotPasse varchar(255) ) ;
 
CREATE TABLE patient ( IdPatient int primary key not null ,
    nom varchar (40),
    prenom varchar(40),
    NumTel int,
    wilaya varchar(20),
    sexe varchar(10),
    DateNaissance date,
    Adress varchar(40),
    Email varchar (40) unique ,
    foreign key(Email)references utilisateur (email));
    
    CREATE TABLE medecin ( IdMedecin int primary key not null ,
    nom varchar (40),
    prenom varchar(40),
    NumTel int,
    DateNaissance date,
    Adress varchar(40),
    Email varchar(40) unique,
    foreign key(Email)references utilisateur (email) );
    
    create table dossiermed (
    IdDoss int primary key not null default 0 ,
    IdPatient int not null ,
    foreign key (IdPatient) references patient (IdPatient ) ,
    poids float ,
    taille float CHECK( taille > 0 && taille < 200) ,
    IMC int,
    nss varchar(10),
    grs varchar(10),
    categorie varchar (40) ,
     IdAnt int not null ,
    foreign key (IdAnt ) references antecedant(IdAnt),
	Iddep int not null ,
    foreign key (Iddep ) references depistage(Iddep)
    );
    
    
create table adminstrateur ( IdAdmin int primary key not null , 
nom varchar (40),
prenom varchar(40),
NumTel int,
Email varchar(40) unique,
foreign key(Email)references utilisateur (email)  );

create table assistantAdmin ( IdAssistant int primary key not null , 
nom varchar (40),
prenom varchar(40),
NumTel int,
Email varchar(40) unique ,
foreign key(Email)references utilisateur (email) );

create table infirmier( IdInfirmier int primary key not null , 
 nom varchar (40),
prenom varchar(40),
NumTel int,
Email varchar(40) unique ,
foreign key(Email)references utilisateur (email) );

create table RendezVous (IdRDV int primary key , 
DateRDV datetime ,
HeureDébutRDV time, 
HeureFinRDV time,
Motif varchar(40),
IdPatient int not null,
foreign key (IdPatient) references patient (Idpatient),
IdInfirmier int not null ,
foreign key (IdInfirmier) references infirmier (IdInfirmier), 
IdMed int not null ,
foreign key (IdMed ) references medecin(IdMedecin));

create table Statistique (IdStat int primary key ,
 Date_Statistique datetime,
 IdMed int not null ,
 foreign key (IdMed ) references medecin(IdMedecin),
 IdAssistantAdmin int not null ,
 foreign key (IdAssistantAdmin ) references assistantAdmin(IdAssistant)
 );
 
 create table LigneOrd (IdOrdonnace int primary key,
 IdMed int not null ,
 foreign key (IdMed) references medecin (IdMedecin));

create table Médicament (IdMédicament int primary key ,
categorie varchar(100),
NomMedicament varchar(100));

create table Orientation (IdOriantation int not null,
DateOrientation date ,
DescriptionOrt varchar(300),
IdMed int not null,
 IdPatient int not null,
 foreign key (IdPatient) references parient (IdPatient),
 foreign key (IdMed) references medecin (IdMedecin)); 

create table CertificatMdicale (IdCertificatMedicale int primary key,
 DateCertificat date ,
 DescriptionCertf varchar(300),
 IdPatient int not null,
 foreign key (IdPatient) references parient (IdPatient),
 IdMed int not null,
 foreign key (IdMed) references medecin (IdMedecin));

create table Ordonnance (IdOrdonnace int primary key,
 DateORD date,
 IdPatient int not null,
 IdMed int not null , 
 foreign key (IdPatient) references parient (IdPatient),
 foreign key (IdMed) references medecin (IdMedecin));

create table  Rapport (IdRapport int primary key auto_increment,
 DateRapport datetime,
 IdMed int not null,
 IdPatient int not null,
 foreign key (IdPatient) references parient (IdPatient),
 foreign key (IdMed) references medecin (IdMedecin));

create table Consultation (IdConsultation int primary key ,
 DateConsultation datetime ,
 IdMed int not null ,
 IdPatient int not null ,
 foreign key (IdPatient) references parient (IdPatient),
 foreign key (IdMed) references medecin (IdMedecin)); 


create table antecedant ( IdAnt int primary key auto_increment default 0 ,
IdPatient int ,
foreign key (IdPatient) references patient (IdPatient),
hta boolean  ,
autre boolean  ,
remarque varchar(255),
Appendicectomie  boolean ,
Cholecystectomie boolean  ,
Remarque varchar(255),
Allergique varchar(255) ,
Cardiopathie  boolean  ,
autres boolean ,
Remarque varchar(255),
Toxiques varchar(255));

drop table depistage;
create table depistage ( Iddep int primary key auto_increment ,
IdPatient int unique,
foreign key (IdPatient) references patient (IdPatient),
affectation varchar(40),
Larmolement varchar(40),
Douleurs varchar(40),
Taches varchar(40),
Siffelements varchar(40), 
Angines varchar(40),
répétées varchar(40),  
Epistaxis varchar(40),
musculaires  varchar(40),
articulaires varchar(40),
vértébrales  varchar(40),
Neurologiques varchar(40),
Toux  varchar(40),
Expectorations varchar(40),  
thoraciques varchar(40),
Palpitation varchar(40),
oedèmes varchar(40),
marche  varchar(40),
repos varchar(40),
effort  varchar(40),
permanents varchar(40),
Appétit  varchar(40),
Transit varchar(40),
Selles  varchar(40),
Pyrosis varchar(40),
Rectoreagies  varchar(40),
abdominales varchar(40),
Miction  varchar(40),
Pollakiurie  varchar(40),
Banaturie  varchar(40),
Dysurie varchar(40),
Ballures   varchar(40),
Coliques varchar(40),
CycleRegulier varchar(40),
CycleIrregulier varchar(40),
Sommeil  varchar(40),
Vertiges varchar(40),  
Céphalées  varchar(40),
Peurvide varchar(40),
Perteconnai  varchar(40),
Parésie  varchar(40),
Paresthésie varchar(40),
Echymose  varchar(40),
hémorragies varchar(40),
Obésité varchar(40),
Maigraire varchar(40));


