const mongoose = require("mongoose")
const Schema = mongoose.Schema

const clientSchema = new Schema({
    companyName: {
        type: String,
        required: true,
        uppercase: true
    },
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: [{
        address_1: String,
        address_2: String,
        postal: Number,
        country: String
    }],
    panNumber: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    }
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client