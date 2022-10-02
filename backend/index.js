const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')

const authRouter = require('./routes/auth')

const productRoutes = require('./routes/product')
const clientRoutes = require('./routes/client')
const basicAuth = require('express-basic-auth');
const myAuthorizer = require('./utils/authorizer');

const User = require('./models/user');

// const port = 3000
// connect to the database
async function main() {
    await mongoose.connect('mongodb+srv://private_application:SbfvtOfvJyjZFoYy@cluster0.i6eur.mongodb.net/?retryWrites=true&w=majority')
  }
  
main()
  
const db = mongoose.connection
db.on("error", console.error.bind(console, "Mongo Connection Error"))
db.once("open", () => {
    console.log("Database Connected")
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/auth', authRouter)

app.use(async (req, res, next) => {
  if (req.headers.authorization) {

    const auth = req.headers.authorization.split(' ')[1];
    
    const buf = Buffer.from(auth, 'base64');
    const text = buf.toString('ascii');

    const [username, password] = text.split(':');

    if (!username || !password) {
      return res.status(401).json({ error: 'username or password is not set' })  
    } 

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'invalid username' })  
    }

    if (user.password.toString() !== password.toString()){
      return res.status(401).json({ error: 'invalid password' })
    }  

    req.user = user;

  } else {
    return res.status(401).json({ error: 'no auth header set' })
  }

  next();

});

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