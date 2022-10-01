const express = require('express')
const app = express()
const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/ems')
  }
  
main()
  
const db = mongoose.connection
db.on("error", console.error.bind(console, "Mongo Connection Error"))
db.once("open", () => {
    console.log("Database Connected")
})