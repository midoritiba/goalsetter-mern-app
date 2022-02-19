const path = require ('path')
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

//Route - Goals & Users
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

//Serve frontend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}else{
    app.get('/', (req, res) => res.send('Please set to production'))
}

//Error Handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server up and running on port ${port}`))