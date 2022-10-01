/*
Need to implement update functionality and figure out how to store invoice data in user model
*/

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')

router.get('/', catchAsync(async (req, res) => {
    const user = await User.find()
                           .populate('products')
                           .populate('clients')
    res.status(200).json(user)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const {id} = req.params
    const user = await User.findById(id)
                           .populate('products')
                           .populate('clients')
    if (user) {
        res.status(200).json(user)
    }
    else {
        res.status(404).json({message: "User does not exist"})
    }
}))

router.post('/', catchAsync(async (req, res) => {
    const userDetails = req.body
    const newUser = new User(userDetails)
    await newUser.save()
    res.status(200).json(newUser)
}))

// router.patch('/:id', catchAsync(async (req, res) => {
//     const {id} = req.params
//     const details = req.body
//     const user = await User.findByIdAndUpdate(id, details)
//     res.status(200).json({
//         message: 'Updated',
//         user
//     })
// }))

router.delete('/:id', catchAsync(async (req, res) => {
    const {id} = req.params
    const user = await User.findByIdAndDelete(id)
    if (user) {
    res.status(200).json({
        message: "User deleted successfully"
    })} else {
        res.status(404).json({
            message: "User not found"
        })
    }
}))

module.exports = router