const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    hsnCode: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    units: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product