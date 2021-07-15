'use strict'
/* eslint-env node, es6 */

// Importe les paquets nécessaires
const express = require('express')
const DataStore = require('nedb')
const mysql = require('mysql')


// Port utilisé
const PORT = 8088
const BDD = 'test'

// Base de données test nedb
// const db = new DataStore({ filename: "test" })
// db.loadDatabase()

// Base de données Mysql
const db = mysql.createConnection({
host: "localhost",
// user: "jaz8",
// password: "F$@,ry|\KcL(hM/)/>PR!qq]9\R5~#f<{pFP(#",
user: "root",
password: "",
database : "test"
})

db.connect(function(err) {
    if (err) throw err;
    console.log(`Connexion effectuée à la base de données : ${BDD}`);
    db.query("SELECT * FROM reservation", function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});





// Raccourcis liens
const IMAGES = 'C:/Users/Ari/Desktop/ADRAR/Stage/Projet_Competence/Versions/Version_2.0_05.07.2021/Danger_Parc/ressources/img/'
const STYLES = 'C:/Users/Ari/Desktop/ADRAR/Stage/Projet_Competence/Versions/Version_2.0_05.07.2021/Danger_Parc/styles/'

// Crée une application express
const app = express()

app.use(express.json())

// Méthode GET pour afficher toutes les réservations
app.get('/admin/reservations', (req, res) => {

    db.query("SELECT * FROM reservation", function (err, result) {
        if (err) throw err;
        res.send(result)
        console.log(req.body)
    })
})








// Méthodes CRUD avec NEDB pour tests

// CRUD Get All
app.get('/api/test', (req, res) => {
    db.find({}, (err, docs) => {
        if (err) console.log(err)

        res.send(docs)
        console.log(req.body)
    })
})

// CRUD Get Find
app.get('/api/test/:id', (req, res) => {
    db.find({_id: req.params.id}, (err, docs) => {
        if (err) console.log(err)

        res.send(docs)
    })
})

// CRUD Post
app.post('/api/test', (req, res) => {
    console.log(req.body)
    db.insert(req.body)
    res.send(req.body)
})
// CRUD Patch Update
app.patch('/api/test/:id', (req, res) => {
    db.update({_id: req.params.id }, { $set: { ...req.body} })
    res.send(req.body)
})

// CRUD Delete
app.delete('/api/test/:id', (req, res) => {
    db.remove({ _id: req.params.id })
})

/////////////////////////////////////////////////////////////////////


// Importe la logique de la page d'accueil
const genererModelePage = require('../pages/ModelePage-get');

// Ecoute la méthode GET et la route '/'
app.get('/', async(req, res) => {
    const indexHtml = await genererModelePage('index')

    res.send(indexHtml)
})


// Ecoute la méthode GET et la route '/'
app.get('/reservation', async(req, res) => {
    const reservationHtml = await genererModelePage('reservation')

    res.send(reservationHtml)
})

// Ecoute la méthode GET et la route '/'
app.get('/attractions', async(req, res) => {
    const attractionsHtml = await genererModelePage('attractions')

    res.send(attractionsHtml)
})

// Ecoute la méthode GET et la route '/'
app.get('/informations', async(req, res) => {
    const informationsHtml = await genererModelePage('informations')

    res.send(informationsHtml)
})

// Ecoute la méthode GET et la route '/'
app.get('/contact', async(req, res) => {
    const contactHtml = await genererModelePage('contact')

    res.send(contactHtml)
})

// Ecoute les requêtes du répertoire donné et associe les au répertoire donné
// Retourne les images
app.use('/ressources/img', express.static(IMAGES))
// Retourne les styles
app.use('/styles', express.static(STYLES))


// Démarre le serveur et écoute le port indiqué
app.listen(PORT, () => {
    console.log(`Serveur démarré : http://localhost:${PORT}`)
})

