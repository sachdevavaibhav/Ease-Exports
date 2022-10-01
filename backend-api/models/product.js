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
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    company: Object
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product