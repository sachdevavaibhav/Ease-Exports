const express = require('express')
const router = express.Router({mergeParams:true})
const Client = require('../models/client')
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')

router.get('/', catchAsync(async (req, res) => {
    // return all clients
    const client = await Client.find()
    res.status(200).json(client)
}))

router.get('/:clientId', catchAsync(async (req, res) => {
    // return specific client
    const {clientId} = req.params
    const client = await User.findById(clientId)
    res.status(200).json(client)
}))

router.post('/', catchAsync(async (req, res) => {
    // create client
    const clientDetails = req.body
    const newClient = new Client(clientDetails)
    const user = await User.findById(id).populate('clients')
    user.clients.push(newClient)
    await newClient.save()
    await user.save()
    res.status(200).json(newClient)
}))

// router.patch('/:clientId', catchAsync(async (req, res) => {
//     // update client
//     const {id} = req.params
//     const details = req.body
//     const user = await User.findByIdAndUpdate(id, details)
//     res.status(200).json({
//         message: 'Updated',
//         user
//     })
// }))

router.delete('/:clientId', catchAsync(async (req, res) => {
    // delete client
    const {clientId} = req.params
    const client = await Client.findByIdAndDelete(clientId)
    if (client) {
    res.status(200).json({
        message: "Client deleted successfully",
        client
    })} else {
        res.status(404).json({
            message: "Client not found"
        })
    }
}))


module.exports = router