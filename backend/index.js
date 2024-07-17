const express =  require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()
const authController = require("./controllers/authcontroller")


// mongodb connect
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });




// routes & middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/auth", authController)


// starting server
app.listen(process.env.PORT, () => {console.log('Server is Started Successfully')})