const express = require('express')
const router = express.Router({mergeParams:true})
const User = require('../models/user')

/*
- get user/:id/product/:productId
- post user/:id/product/
- patch user/:id/product/:productId
- delete user/:id/product/:productId
*/ 

router.get('/', async (req, res) => {
    // return all clients
    const {id} = req.params
    const user = await User.findById(id)
    res.status(200).json(user)
})

router.get('/:clientId', async (req, res) => {
    // return specific client
    const {id} = req.params
    const user = await User.findById(id)
    res.status(200).json(user)
})

router.post('/', async (req, res) => {
    // create client
    const userDetails = req.body
    const newUser = new User(userDetails)
    await newUser.save()
    res.status(200).json(newUser)
})

router.patch('/:clientId', async (req, res) => {
    // update client
    const {id} = req.params
    const details = req.body
    const user = await User.findByIdAndUpdate(id, details)
    res.status(200).json({
        message: 'Updated',
        user
    })
})

router.delete('/:clientId', async (req, res) => {
    // delete client
    const {id} = req.params
    const user = await User.findByIdAndDelete(id)
    res.status(200).json({
        message: "user deleted successfully"
    })
})


module.exports = router