/*
Need to implement update functionality and figure out how to store invoice data in user model
*/

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Exporter = require('../models/exporter');
const catchAsync = require('../utils/catchAsync')

router.get('/', catchAsync(async (req, res) => {
    const user = await User.find()
                           .populate('exporter')
                        //    .populate('clients')
    res.status(200).json(user)
}))

router.get('/:id', catchAsync(async (req, res) => {
    const {id} = req.params
    const user = await User.findById(id)
                           .populate('exporter')
                        //    .populate('clients')
    if (user) {
        res.status(200).json(user)
    }
    else {
        res.status(404).json({message: "User does not exist"})
    }
}))


router.post('/exporter', catchAsync(async (req, res) => {
    const exporterDetails = req.body
    const exporter = new Exporter({...exporterDetails, });
    await exporter.save()
    res.status(200).json(exporter)
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