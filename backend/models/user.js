const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: false,
        unique:true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    hashedPassword: {
        type: String,
        required: true
    },
    exporter: {type: mongoose.Schema.Types.ObjectId, ref: 'Exporter'}
})

const User = mongoose.model('User', userSchema)

module.exports = User