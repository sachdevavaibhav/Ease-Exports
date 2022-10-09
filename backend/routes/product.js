const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const checkAuth = require('../middleware/checkAuth')
const generateResponse = require('../utils/generateResponse')
const Exporter = require('../models/exporter')

router.get('/',checkAuth,catchAsync(async (req, res) => {
    // return all products
    const userId = req.userData.userId
    const user = await User.findById(userId).populate('exporter', '_id products')
    const productsId = user.exporter.products
    if (productsId.length < 1) {
        return res.status(404).json(generateResponse(req, res, {message: "Products not found"}))
    }
    const products = await Product.find({'_id': {$in:productsId}})
    res.status(200).json(generateResponse(req, res, products))
}))

router.get('/:productId',checkAuth,catchAsync(async (req, res) => {
    // return specific product 
    const userId = req.userData.userId
    const {productId} = req.params
    const user = await User.findById(userId).populate('exporter', 'products')
    if (!user.exporter){
        return res.status(403).json(generateResponse(req, res, {message: "Register a exporter first"}))
    }
    isProductAvailable = user.exporter.products.includes(productId)
    if (!isProductAvailable) {
        return res.status(403).json(generateResponse(req, res, {message: "Anauthorized"}))
    }
    const product = await Product.findById(productId)
    res.status(200).json(generateResponse(req, res, product))
}))

router.post('/',checkAuth,catchAsync(async (req, res) => {
    // create product
    const userId = req.userData.userId
    const user = await User.findById(userId)
    if (!user.exporter) {
        return res.status(403).json(generateResponse(req, res, {message: "Register a exporter first"}))
    }
    const exporter = await Exporter.findById(user.exporter._id)
    const productDetails = {
        hsnCode: req.body.hsnCode,
        description: req.body.description,
        unit: req.body.unit,
        price: req.body.price
    }
    const newproduct = new Product(productDetails)
    exporter.products.push(newproduct)
    await newproduct.save()
    await exporter.save()
    res.status(200).json(generateResponse(req, res, {message: "Product added successfully"}))
}))

router.patch('/:productId',checkAuth,catchAsync(async (req, res) => {
    // update product
    const userId = req.userData.userId
    const {productId} = req.params
    const user = await User.findById(userId).populate('exporter', 'products')
    if (!user.exporter){
        return res.status(403).json(generateResponse(req, res, {message: "Register a exporter first"}))
    }
    const isProductAvailable = user.exporter.products.includes(productId)
    if (!isProductAvailable) {
        return res.status(403).json(generateResponse(req, res, {message: "Anauthorized"}))
    }
    const updatedDetails = {}
    for (let prop of Object.keys(req.body)) {
        updatedDetails[prop] = req.body[prop]
    }
    await Product.findByIdAndUpdate(productId, updatedDetails)
    res.status(200).json(generateResponse(req,res,{message: "Product updated successfully"}))
}))

router.delete('/:productId',checkAuth,catchAsync(async (req, res) => {
    // delete product
    const userId = req.userData.userId
    const {productId} = req.params
    const user = await User.findById(userId).populate('exporter', 'products')
    const exporter = await Exporter.findById(user.exporter._id)
    const isProductAvailable = exporter.products.includes(productId)
    if (!isProductAvailable) {
        return res.status(404).json(generateResponse(req, res, {message: "Product not found"}))
    }
    const product = await Product.findByIdAndDelete(productId)
    const productIndex = exporter.products.indexOf(productId)
    exporter.products.splice(productIndex,1)
    await exporter.save()
    if (product) {
        res.status(200).json(generateResponse(req, res, {message: "Product deleted successfully"}))
    } 
    else {
        res.status(404).json(generateResponse(req, res, {message: "Product not found"}))
    }
}))


module.exports = router