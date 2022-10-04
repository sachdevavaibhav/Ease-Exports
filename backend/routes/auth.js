const express = require('express')
const router = express.Router()
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')

router.post('/sign-up', catchAsync(async (req, res) => {
    // sign up
    const userDetails = req.body
    const newUser = new User(userDetails)
    await newUser.save()
    res.status(200).json(newUser)
}))

// router.post('/sign-in', catchAsync(async (req, res) => {
//     // sign in
//     const userDetails = req.body
//     if (userDetails.username && userDetails.password) {
            // do something 
//     }
//     await newUser.save()
//     res.status(200).json(newUser)
// }))

module.exports = router;
