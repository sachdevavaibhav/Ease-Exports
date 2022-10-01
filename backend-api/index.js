const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const clientRoutes = require('./routes/client')

// const port = 3000
// connect to the database
async function main() {
    await mongoose.connect('mongodb://localhost:27017/ems')
  }
  
main()
  
const db = mongoose.connection
db.on("error", console.error.bind(console, "Mongo Connection Error"))
db.once("open", () => {
    console.log("Database Connected")
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/user', userRoutes)
app.use('/user/:id/products', productRoutes)
app.use('/user/:id/clients', clientRoutes)

app.use((req, res, next) => {
  const error = new Error('Not Found!')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app