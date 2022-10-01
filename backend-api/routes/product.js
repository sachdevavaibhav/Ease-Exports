const express = require('express')
const router = express.Router({mergeParams:true})
const Product = require('../models/product')
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')

router.get('/', catchAsync(async (req, res) => {
    // return all products
    const product = await Product.find()
    res.status(200).json(product)
}))

router.get('/:productId', catchAsync(async (req, res) => {
    // return specific product 
    const {productId} = req.params
    const product = await product.findById(productId)
    res.status(200).json(product)
}))

router.post('/', catchAsync(async (req, res) => {
    // create product
    const {id} = req.params
    const productDetails = req.body
    const newproduct = new Product(productDetails)
    const user = await User.findById(id).populate('products')
    user.products.push(newproduct)
    await newproduct.save()
    await user.save()
    res.status(200).json(newproduct)
}))

// router.patch('/:productId', catchAsync(async (req, res) => {
//     // update product
//     const {id} = req.params
//     const details = req.body
//     const product = await product.findByIdAndUpdate(id, details)
//     res.status(200).json({
//         message: 'Updated',
//         user
//     })
// }))

router.delete('/:productId', catchAsync(async (req, res) => {
    // delete product
    const {id} = req.params
    const product = await User.findByIdAndDelete(id)
    res.status(200).json({
        message: "user deleted successfully"
    })
}))


module.exports = router