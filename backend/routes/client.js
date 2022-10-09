const express = require('express')
const router = express.Router()
const Client = require('../models/client')
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const checkAuth = require('../middleware/checkAuth')
const generateResponse = require('../utils/generateResponse')
const Exporter = require('../models/exporter')

router.get('/',checkAuth,catchAsync(async (req, res) => {
    // return all clients
    const userId = req.userData.userId
    const user = await User.findById(userId).populate('exporter', '_id clients')
    const clientsId = user.exporter.clients
    if (clientsId.length < 1) {
        return res.status(404).json(generateResponse(req, res, {message: "Clients not found"}))
    }
    const clients = await Client.find({'_id': {$in:clientsId}})
    res.status(200).json(generateResponse(req, res, clients))
}))

router.get('/:clientId',checkAuth,catchAsync(async (req, res) => {
    // return specific client 
    const userId = req.userData.userId
    const {clientId} = req.params
    const user = await User.findById(userId).populate('exporter', 'clients')
    if (!user.exporter){
        return res.status(403).json(generateResponse(req, res, {message: "Register a exporter first"}))
    }
    isClientAvailable = user.exporter.clients.includes(clientId)
    if (!isClientAvailable) {
        return res.status(404).json(generateResponse(req, res, {message: "Client not found"}))
    }
    const client = await Client.findById(clientId)
    res.status(200).json(generateResponse(req, res, client))
}))

router.post('/',checkAuth,catchAsync(async (req, res) => {
    // create client
    const userId = req.userData.userId
    const user = await User.findById(userId)
    if (!user.exporter) {
        return res.status(403).json(generateResponse(req, res, {message: "Register a exporter first"}))
    }
    const exporter = await Exporter.findById(user.exporter._id)
    const clientDetails = {
        companyName: req.body.companyName,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        panNumber: req.body.panNumber,
        bankName: req.body.bankName
    }
    const newclient = new Client(clientDetails)
    exporter.clients.push(newclient)
    await newclient.save()
    await exporter.save()
    res.status(200).json(generateResponse(req, res, {message: "Client added successfully"}))
}))

router.patch('/:clientId',checkAuth,catchAsync(async (req, res) => {
    // update client
    const userId = req.userData.userId
    const {clientId} = req.params
    const user = await User.findById(userId).populate('exporter', 'clients')
    if (!user.exporter){
        return res.status(403).json(generateResponse(req, res, {message: "Register a exporter first"}))
    }
    const isclientAvailable = user.exporter.clients.includes(clientId)
    if (!isclientAvailable) {
        return res.status(404).json(generateResponse(req, res, {message: "Client not found"}))
    }
    const updatedDetails = {}
    for (let prop of Object.keys(req.body)) {
        updatedDetails[prop] = req.body[prop]
    }
    await Client.findByIdAndUpdate(clientId, updatedDetails)
    res.status(200).json(generateResponse(req,res,{message: "Client updated successfully"}))
}))

router.delete('/:clientId',checkAuth,catchAsync(async (req, res) => {
    // delete client
    const userId = req.userData.userId
    const {clientId} = req.params
    const user = await User.findById(userId).populate('exporter', 'clients')
    const exporter = await Exporter.findById(user.exporter._id)
    const isclientAvailable = exporter.clients.includes(clientId)
    if (!isclientAvailable) {
        return res.status(404).json(generateResponse(req, res, {message: "client not found"}))
    }
    const client = await Client.findByIdAndDelete(clientId)
    const clientIndex = exporter.clients.indexOf(clientId)
    exporter.clients.splice(clientIndex,1)
    await exporter.save()
    if (client) {
        res.status(200).json(generateResponse(req, res, {message: "Client deleted successfully"}))
    } 
    else {
        res.status(404).json(generateResponse(req, res, {message: "Client not found"}))
    }
}))


module.exports = router