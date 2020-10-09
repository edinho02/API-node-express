const database = require('./database/databaseController')

const port = 3033

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/products/:id', (req, res) => {
    res.send(database.getProduct(req.params.id))
})

app.get('/products', (req, res) => {
    res.send(database.getProducts())
})

app.post('/products', (req, res) => {
    const product = database.postProduct({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    })

    res.send(product)
})

app.put('/products/:id', (req, res) => {
    if (req.params.id < database.verifyId()) {
        const product = database.postProduct({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            id: req.params.id
        })
        
        res.send(product)
    } else {
        res.status(404).send('This product doesn\'t exist.')
    }
})

app.delete('/products/:id', (req, res) => {
    database.deleteProducts(req.params.id)

    res.sendStatus(204)
})

app.listen(port, () => {
    console.log('App running...')
})