const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: false,
        lowercase: true,
        unique:true
    },
    password: {
        type: String
    },
    gst: {
        type: String,
        required: false,
        uppercase: true 
    },
    iec: {
        type: String,
        required: false,
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
        required: false,
    },
    email: {
        type: String,
        required: false,
        lowercase: true
    },
    companyName: {
        type: String,
        required: false
    },
    bankDetail: [{
        bankName: String,
        accountNumber: Number,
        ifsc: String,
        branch: String
    }],
    products: [{type:mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    clients: [{type:mongoose.Schema.Types.ObjectId, ref: 'Client'}]
})

const User = mongoose.model('User', userSchema)

module.exports = User