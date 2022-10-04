/*
Need to implement update functionality and figure out how to store invoice data in user model
*/

const express = require('express')
const router = express.Router({mergeParams:true})
const Exporter = require('../models/exporter')
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')

router.get('/', catchAsync(async (req, res) => {
    const exporters = await Exporter.find()
                           .populate('products')
                           .populate('clients')
    res.status(200).json(exporters)
}))

router.get('/:exporterId', catchAsync(async (req, res) => {
    const {exporterId} = req.params
    const exporter = await User.findById(exporterId)
                           .populate('products')
                           .populate('clients')
    if (exporter) {
        res.status(200).json(exporter)
    }
    else {
        res.status(404).json({message: "Exporter does not exist"})
    }
}))

router.post('/', catchAsync(async (req, res) => {
    const {id} = req.params
    const exporterDetails = req.body
    const newExporter = new Exporter(exporterDetails)
    const user = User.findById(id)
    user.exporter = user
    await newExporter.save()
    await user.save()
    res.status(200).json(newExporter)
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

router.delete('/:exporterId', catchAsync(async (req, res) => {
    const {exporterId} = req.params
    const exporter = await Exporter.findByIdAndDelete(exporterId)
    if (exporter) {
    res.status(200).json({
        message: "Exporter deleted successfully"
    })} else {
        res.status(404).json({
            message: "Exporter not found"
        })
    }
}))

module.exports = router