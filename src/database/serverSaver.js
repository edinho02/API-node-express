const fs = require('fs')

const allProducts = require('./database.json')
const databaseConfig = require('./config.json')

function save() {
    fs.writeFile(__dirname + '/database.json', JSON.stringify(allProducts), err => {
        if(err) console.log('Error on saving data:\n', err)
    })
}

function config(id) {
    fs.writeFile(__dirname + '/config.json', JSON.stringify(id), err => {
        if(err) console.log('Error on saving data:\n', err)
    })
}

module.exports = {
    allProducts,
    databaseConfig,
    save,
    config
}