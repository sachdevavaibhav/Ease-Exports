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
    exporter: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Exporter'
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User