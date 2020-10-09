const saver = require('./serverSaver')

const sequence = {
    _id: saver.databaseConfig.id,
    get lastId() { return this._id },
    get id() {
        saver.config({ id: this._id + 1 })
        return this._id++ 
    }
}

function postProduct(product) {
    product.id = !product.id ? sequence.id : parseInt(product.id, 10)
    saver.allProducts[product.id] = product
    saver.save()
    return product
}

function getProduct(id) {
    return saver.allProducts[id] ? saver.allProducts[id] : {}
}

function getProducts() {
    return Object.values(saver.allProducts)
}

function deleteProducts(id) {
    delete saver.allProducts[id]
    saver.save()
}

function verifyId() {
    return sequence.lastId
}

module.exports = {
    verifyId,
    postProduct,
    getProduct,
    getProducts,
    deleteProducts
}