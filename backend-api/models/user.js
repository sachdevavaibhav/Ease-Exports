const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String
    },
    gst: {
        type: String,
        required: true,
        uppercase: true 
    },
    iec: {
        type: String,
        required: true,
        uppercase: true
    },
    lut: {
        type: String,
        required: false,
        uppercase: true
    },
    address: [{
        address_1: String,
        address_2: String,
        postal: Number,
        country: String
    }],
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    companyName: {
        type: String,
        required: true
    },
    bankDetail: [{
        bankName: String,
        accountNumber: Number,
        ifsc: Number,
        branch: String
    }],
    products: Object,
    clients: Object
})

const User = mongoose.model('User', userSchema)

module.exports = User