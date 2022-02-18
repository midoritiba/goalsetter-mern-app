const express = require('express')
const colort = require ('colors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

connectDB()
const app = express ()

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Route - Goal
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
//Error Handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server up and running on port ${port}`))