/*
Need to implement update functionality and figure out how to store invoice data in user model
*/

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcrypt')

router.post('/signup', catchAsync(async (req, res) => {
    const {email, password} = req.body
    if (!(email && password)) {
        return res.status(400).json({error:"Enter username and password"})
    }
    checkEmail = await User.find({email})
    if (checkEmail.length >= 1) {
        return res.status(400).json({message: "User already exists" })
    }
    else {
        const hashedPassword = bcrypt.hash(password, 10, function(err, hashedPassword) {
            if (err) {
                res.status(500).json({
                    error:err
                })
            } 
            else { 
                const password = hashedPassword
                return password
        }
    })
        const user = new User({email,hashedPassword})
        await user.save()
        return res.status(200).json(user)
    }
}))

router.get('/signin', (req, res) => {
    // 
})

module.exports = router