const express = require('express');
const dotenv = require('dotenv').config()
port = process.env.PORT || 5000
const colors = require('colors');
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db');

connectDB();
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) =>{
    res.send({message: 'Hello this is our app GOAL SETTERS'})
})

//Connecting the server to goal ROUTES
app.use('/api/goals', require('./routes/goalRoutes'))

//Connecting the server to user ROUTES
app.use('/api/users', require('./routes/userRoutes'))

//middleware errorHandler
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))