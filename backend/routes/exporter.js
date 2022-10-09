const express = require('express')
const router = express.Router({mergeParams:true})
const Exporter = require('../models/exporter')
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const checkAuth = require('../middleware/checkAuth')
const generateResponse = require('../utils/generateResponse')

router.get('/',checkAuth,catchAsync(async (req, res) => {
    const userId = req.userData.userId
    const user = await User.findById(userId).populate('exporter', '_id')
    if (user.exporter) {
        const exporter = await Exporter.findById(user.exporter._id)
                            .populate('products')
                            .populate('clients')
        return res.status(200).json(generateResponse(req, res, exporter))
    }
    res.status(404).json(generateResponse(req, res, {message: "Exporter not found"}))
}))

router.post('/',checkAuth,catchAsync(async (req, res) => {
    const userId = req.userData.userId
    const user = await User.findById(userId)
    if (user.exporter) {
        return res.status(403).json(generateResponse(req, res, {message: "Exporter already exists"}))
    }
    const exporterDetails = { // validate schema using joe
        gst: req.body.gst,
        iec: req.body.iec,
        lut: req.body.lut,
        address: req.body.address,
        phone: req.body.phone,
        companyEmail: req.body.companyEmail,
        bankDetail: req.body.bankDetail
    }
    const newExporter = new Exporter(exporterDetails)
    user.exporter = newExporter
    await newExporter.save()
    await user.save()
    res.status(200).json(generateResponse(req, res, {message: "Exporter created succesfully"}))
}))

router.patch('/:exporterId',checkAuth,catchAsync(async (req, res) => {
    const {exporterId} = req.params
    const updatedDetails = {}
    for (let prop of Object.keys(req.body)) {
        updatedDetails[`${prop}`] = req.body[`${prop}`]
    }
    await Exporter.findByIdAndUpdate(exporterId, updatedDetails)
    res.status(200).json(generateResponse(req, res, {message: "Exporter details updated successfully"}))
}))

router.delete('/',checkAuth ,catchAsync(async (req, res) => {
    const userId = req.userData.userId
    const user = await User.findById(userId).populate('exporter', '_id')
    const exporterId = user.exporter._id
    const exporter = await Exporter.findByIdAndDelete(exporterId)
    if (exporter) {
    user.exporter = undefined // search for how to delete all associated refs
    user.save()
    res.status(200).json(generateResponse(req, res, {message: "Exporter deleted successfully"}))} 
    else {
        res.status(404).json(generateResponse(req, res, {message: "Exporter not found"}))
    }
}))

module.exports = router