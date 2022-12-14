const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const exporterRoutes = require('./routes/exporter')
const productRoutes = require('./routes/product')
const clientRoutes = require('./routes/client')
const generateResponse = require('./utils/generateResponse')
require('dotenv')

// connect to the database
async function main() {
    await mongoose.connect(process.env.DB_URL)
  }
  
main()
  
const db = mongoose.connection
db.on("error", console.error.bind(console, "Mongo Connection Error"))
db.once("open", () => {
    console.log("Database Connected")
})
// Handle CORS error
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // Allow req from anywhere
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization') // Allow mentioned header in response
  if (res.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    return res.status(200).json(generateResponse(req, res, {}))
  }
  next()
})

// parse incoming request
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// setting up routes
app.use('', userRoutes)
app.use('/exporter', exporterRoutes)
app.use('/products', productRoutes)
app.use('/clients', clientRoutes)

// Handle 404 not found
app.use((req, res, next) => {
  const error = new Error('Not Found!')
  error.status = 404
  next(error)
})

// Handle all errors
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json(generateResponse(req, res, {message: error.message}))
})

module.exports = app