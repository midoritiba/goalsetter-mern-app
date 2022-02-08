const express = require('express');
const dotenv = require('dotenv').config()
port = process.env.PORT || 5000
const colors = require('colors');
const {errorHandler} = require('./middleware/errorMiddleware')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) =>{
    res.send({message: 'Hello this is our app GOAL SETTERS'})
})

//Connecting the server to goal ROUTES
app.use('/api/goals', require('./routes/goalRoutes'))

//middleware errorHandler
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))