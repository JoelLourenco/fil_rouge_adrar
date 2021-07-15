'use strict'
/* eslint-env node, es6 */

const { join } = require('path')

const { readFile } = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(readFile)

const READ_OPTIONS = { encoding : 'UTF-8' }
const URL_HTML = 'C:/Users/Ari/Desktop/ADRAR/Stage/Projet_Competence/Versions/Version_2.0_05.07.2021/Danger_Parc/html'

const lireFichierHtml = file => readFileAsync(join(URL_HTML, file), READ_OPTIONS)

module.exports = async nomPage => {
    //Récupérer le contenu HTML et des éléments de la page
    const [
        modeleHTML,
        headIndexHTML,
        bodyIndexHTML,
    ] 
    = await Promise.all([
        lireFichierHtml('modele.html'),
        lireFichierHtml(`${nomPage}.head.html`),
        lireFichierHtml(`${nomPage}.body.html`)
    ])

    const indexHtml = modeleHTML
        .replace('{{EN-TETE}}', headIndexHTML)
        .replace('{{CONTENU}}', bodyIndexHTML)

    // Retourner la page HTML
    return indexHtml
}

