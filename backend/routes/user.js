/*
Need to implement update functionality and figure out how to store invoice data in user model
*/

const express = require('express')
const router = express.Router()
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const JWT_KEY = process.env.JWT_KEY

router.post('/signup', catchAsync(async (req, res) => {
    let {email, password} = req.body
    if (!(email && password)) {
        return res.status(400).json(
            {request: {
            type: req.method,
            status:res.statusCode,
            }, 
            response: {error:"Enter username and password"}
        })
    }
    checkEmail = await User.find({email})
    if (checkEmail.length >= 1) {
        return res.status(403).json(
            {request: {
            type: req.method,
            status: res.statusCode
            },
            response: {message: "User already exists"} 
        })
    }
    else {
        bcrypt.hash(password, 10, async function(err, result) {
            if (err) { 
                return res.status(401).json({
                    request: {
                        type: req.method,
                        status: res.statusCode
                    },
                    response: {error:err}
                })
            } 
            else { 
                const user = new User({email:email, password:result})
                await user.save()
                return res.status(200).json({
                    request: {
                        type: req.method,
                        status: res.statusCode
                    },
                    response: {
                        message: "User registered successfully"
                    }
                })
            }
        })
    }
}))

router.post('/signin', catchAsync(async (req, res) => {
    const {email, password} = req.body
    const user = await User.find({email})
    if (user.length < 1) {
        return res.status(401).json({
            request: {
                type: req.method,
                status: res.statusCode
            },
            response: {
                message: 'Auth failed'
            }
        })
    }
    bcrypt.compare(password, user[0].password, function(err, result) {
        if (err) {
            return res.status(401).json({
                request: {
                    type: req.method,
                    status: res.statusCode
                },
                response: {
                    message: 'Auth failed'
                }
            })
        }
        if (result) {
            const token = jwt.sign({
                email: user[0].email,
                userId: user[0]._id
            },
            JWT_KEY,
            {
                expiresIn: '1h'
            }
            )
            return res.status(200).json({
                request: {
                    type: req.method,
                    status: res.statusCode
                },
                response: {
                    message: 'Auth successful',
                    token: token
                }
            })
        }
        res.status(401).json({
            request: {
                type: req.method,
                status: res.statusCode
            },
            response: {
                message: 'Auth failed'
            }
        })
    });
}))

module.exports = router