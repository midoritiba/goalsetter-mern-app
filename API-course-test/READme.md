## 1. Create **BACKEND/** Folder in the root;

<br>

## 2. Inside the Backend Folder, create a **SERVER.JS**;

<br>

## 3. On the terminal **root**:<br>

    $ npm init

    description: Goalsetter app
    entry point: server.js
    author: Me
    license: MIT

## 4. Create a **.GITIGNORE** file in the **root**, and insert:

    node_modules
    .env

## 5. On the terminal **root**:

    $ npm i express dotenv mongoose colors
    $ npm i -D nodemon

## 6. Inside **package.json**:

    "script":
    "start": "node server.js",
    "server": "nodemon server.js"

## 7. On the terminal **root**:

    $ git add .
    $ git commit -m 'Initial commit'

## 8. On **server.js**:

    const express = require('express')
    const dotenv = require('dotenv')
    const port = process.env.PORT || 5000

    const app = express()

    app.get('/api/goals', (req, res)=> {
        res.status(200).json({message: Get Goals})
    })

    app.listen(port, () => console.log(`Server running on port ${port}`));

## 9. On **root**:

    create a .env file:
    NODE_ENV = development
    PORT = 5000

## 10. In the **BACKEND/** folder:

    - create a folder ROUTES
    - inside ROUTES, create a file goalRoutes.js

## 11. backend/routes/goalRoutes.js:

    const express = require('express')
    const router = express.Router();

    router.get('/', (req, res) => {
    res.send('Get Goals')
    })

    module.exports = router;

## 12. let's change our server.js, because now we can add our goalRoutes.js

    app.use('/api/goals', require('./routes/goalRoutes'))

## 13. we want to create 4 different request inside our goal Route - GET, POST, PUT AND DELETE:

    const express = require('express')
    const router = express.Router();

    router.get('/', (req, res) => {
    res.send({message: 'Get Goals'})
    })

    router.post('/', (req, res) => {
    res.send({message: 'Set Goals'})
    })

    router.put('/:id', (req, res) => {
    res.send({message: `Update goal ${req.params.id}`})
    })

    router.delete('/:id', (req, res) => {
    res.send({message: `Delete goal ${req.params.id}`})
    })

    module.exports = router;

## 14. Try a test on Postman:

    - GET: http://localhost:5000/api/goals
    - POST: http://localhost:5000/api/goals
    - PUT: http://localhost:5000/api/goals/123
    - DELETE: http://localhost:5000/api/goals/123

## 15. For a better practice, we want to make our routes file look cleaner, for that we will create CONTROLLERS folder to organize our requests:

    - create a goalController.js:

    // @desc Get goals
    //@route GET /api/goals
    //@access Private
    const getGoals = (req, res) =>{
        res.status(200).json({message: 'Get goal})
    })

    // @desc Set goal
    //@route POST /api/goals
    //@access Private
    const setGoal = (req, res) =>{
        res.status(200).json({message: 'Set goal})
    })

    // @desc Update goal
    //@route PUT /api/goals/:id
    //@access Private
    const updateGoal = (req, res) =>{
        res.status(200).json({message: `Update goal ${req.params.id}`})
    })

    // @desc Delete goal
    //@route DELETE /api/goals/:id
    //@access Private
    const deleteGoal = (req, res) =>{
        res.status(200).json({message: `Delete goal ${req.params.id}`})
    })

    module.exports = {
        getGoals,
        setGoal,
        updateGoal,
        deleteGoal
    }

## 16. After putting all necessaries commands on our controllers, we go back to ROUTES to simplify the code:

    const express = require('express');
    const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
    const router = express.Router();

    //get and post route
    router.route('/').get(getGoals).post(setGoal)

    //put and delete route
    router.route('/:id').put(updateGoal).delete(deleteGoal)


    module.exports = router

## 17. In order to use req.body, on SERVER.JS we need to add the following middlewares:

    app.use(express.json())
    app.use(express.urlencoded({extended: false}))

## 18. now on goalControllers we can add to access the actual goal we added:

    const setGoal = (req, res) => {
        console.log(req.body)
        res.status(200).json({message: 'Set Goal})
    }
    (temporarely code to check the req.body response)

## 19. still on our goalController:

    // @desc Set goals
    //@route POST /api/goals
    //@access Private
    const setGoal = (req, res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error ('Please add a text field')
    }

DESCRIPTION
Bulk Edit

        res.status(200).json({message:'Set goal'})
    }

    //    with this set of code, when we don't receive a text data (req.body.text), we will receive the error message

## 20. The problem now is how our error message is showed to us. If we don't include a 'text format' in our SETGOAL, we get a 400 message, but we also receive an HTML code and we don't want that. In order to solve that, we can create a errorHandler middleware to change our default error handler.

    1. Create a folder called MIDDLEWARE in BACKEND
    2. Create a file called errorMiddleware.js

    const errorHandler = (err, req, res, next)=> {
        const statusCode = res.statusCode ? res.statusCode : 500
        res.status(statusCode)
        res.json({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        })
    }
    module.exports = {
        errorHandler
    }

## 21. on SERVER.JS we are now connecting the errorHandler middleware in order to get a proper error message in case we receive one :

    const {errorHandler} = require('./middleware/errorMiddleware')

    //right before app.listen, add the middleware:
    app.use(errorHandler)

## 22. Back in the goalController.js, when we use mongoose to interact to database we get back a promise, so we need to use async-await. If we dont want to use try-catch, there is package Express-async-handler that we can use:

    $ npm i express-async-handler

    goalController.js:
    const asyncHandler = require ('express-async-handler');
    const Goal = require('../models/goalModel')

    // @desc Get goals
    //@route GET /api/goals
    //@access Private
    const getGoals = asyncHandler (async(req, res) =>{
        const goals = await Goal.find()
        res.status(200).json(goals)
    })

    // @desc Set goals
    //@route POST /api/goals
    //@access Private
    const setGoal = asyncHandler (async(req, res) =>{
        if(!req.body.text){
            res.status(400)
            throw new Error ('Please add a text field')
        }
        const goal = await Goal.create({
            text: req.body.text,
        })
        res.status(200).json(goal)
    })

    // @desc Update goals
    //@route PUT /api/goals
    //@access Private
    const updateGoal = asyncHandler( async(req, res) =>{
        const goal = await Goal.findById(req.params.id)

        if(!goal){
            res.status(400)
            throw new Error('Goal not found')
        }
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
        })
        res.status(200).json(updatedGoal)
    })

    // @desc Delete goals
    //@route DELETE /api/goals
    //@access Private
    const deleteGoal = asyncHandler (async(req, res) =>{
        const goal = await Goal.findById(req.params.id)

        if(!goal){
            res.status(400)
            throw new Error('Goal not found')
        }
        await goal.remove()
        res.status(200).json({id: req.params.id})
    })

    module.exports = {
        getGoals,
        setGoal,
        updateGoal,
        deleteGoal
    }

## 23. Git:

    $ git add .
    $ git commit -m 'Goals controller and routes setup'

## 24. Create database on MongoDB:

    1. Create database called 'mernapp' and 'goals' collection
    2. Get link for the connection. Change the password and the name of the database on the link
    3. Insert your link on .ENV, with the name MONGO_URI = mongodb+srv://data-test:1973Mizinha@testdatabase.8pm8m.mongodb.net/mernapp?retryWrites=true&w=majority

## 25. Now to make the connection with mongoDB:

    1. Create a folder on BACKEND/ called 'config'
    2. Inside config, create 'db.js':
    const mongoose = require('mongoose')

    const connectDB = async () => {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI)
            console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
        } catch (error) {
            console.log(error)
            process.exit(1)
        }
    }

    module.exports = connectDB

## 26. Now we need to insert the connection to our SERVER.JS:

    const connectDB = require('./config/db')

    connectDB()

## 27. Now we are creating our model-goals:

    1. Create a folder called 'models'
    2. create a file called 'goalModel.js'

    const mongoose = require('mongoose');

    const goalSchema = mongoose.Schema({
        text: {
            type: String,
            required: [true, 'Please add a text value']
        }
    }, {
        timestamps: true
    })

    module.exports = mongoose.model('Goal', goalSchema)

---

# Second video [https://www.youtube.com/watch?v=enopDSs3DRw]

## 1. Create a new model called - userModel.js

    const mongoose = require ('mongoose');


    const userSchema = mongoose.Schema({
        name: {
            type: String,
            require: [true, 'Please add a name']
        },
        email: {
            type: String,
            require: [true, 'Please add an email'],
            unique: true
        },
        passwort: {
            type: String,
            require: [true, 'Please add a password']
        },
    },
    {
        timestamps: true
    })

    module.exports = mongoose.model('User', userSchema);

## 2. Go back to the goalModel

    add a user to the schema, so we can connect both models:
        user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

## 3. Create a userRoutes.js, connect to server and organize with userController.js

    - First go to the server.js and connect the new route:
    //Connecting the server to user ROUTES
    app.use('/api/users', require('./routes/userRoutes'))

    - We can start now our router.post in our userRoutes, but to make our routes files look cleaner, we jump to create a userController.js:
    //@desc Register new user
    //@route POST /api/users
    //access PUBLIC
    const registerUser = (req, res) => {
        res.json({message: 'Register User'})
    }

    //@desc Authenticate a user
    //@route POST /api/users/login
    //access PUBLIC
    const loginUser = (req, res) => {
        res.json({message: 'Login User'})
    }

    //@desc Get user data
    //@route GET /api/users/me
    //access PUBLIC
    const getMe = (req, res) => {
        res.json({message: 'User data display'})
    }


    module.exports = {
        registerUser,
        loginUser,
        getMe
    }

    - Import the controllers to our userRoutes:
    const express = require ('express');
    const router = express.Router();
    const { registerUser, loginUser, getMe } = require ('../controllers/userController')

    //POST REQUEST TO ADD A NEW USER
    router.post('/', registerUser)

    //POST LOGIN
    router.post('/login', loginUser)

    //GET DATA USER
    router.get('/me', getMe)

    module.exports = router

## 4. We need to create a register user functionality. And for our password we need encrypt our password:

    $ npm i bcryptjs
    $ npm i jsonwebtoken

    - Now in our userController.js, we add:
    const jwt = require ('jsonwebtoken')
    const bcrypt = require('bcryptjs');
    const asyncHandler = require('express-async-handler')
    const User = require('../models/userModel')

---

# Third video [https://www.youtube.com/watch?v=mvfsC66xqj0]

## 1. In our folder root:

    $ npx create-react-app frontend --template redux

## 2. Go to the file package.json in the root and add:

      "scripts": {
        "start": "node backend/server.js",
        "server": "nodemon backend/server.js",
        "client": "npm start --prefix frontend"
        },

## 3. Deleting files:

    - App.css
    - logo.svg

## 4. In App.js:

    function App() {
    return (
        <div>
        <h1>My App</h1>
        </div>
    );
    }

    export default App;

## 5. src > app > store:

    import { configureStore } from '@reduxjs/toolkit';


    export const store = configureStore({
    reducer: {

    },
    });

## 6. Clear index.css and add the custom one

## 7. Delete custom folder from the features folder

## 8. Inside src folder create a 'pages' folder:

    - Create a file called Dashboard.jsx
    - A file called Login.jsx
    - A file called Register.jsx

## 9. In Dashboard.jsx, Login.jsx and Register.jsx:

    - Snippet: 'rfce'

## 10. Instal package inside /frontend:

    $ npm i react-router-dom

## 11. App.js:

    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Dashboard from './pages/Dashboard';
    import Login from './pages/Login';
    import Register from './pages/Register';

    function App() {
    return (
        <>
        <Router>
            <div className='container'>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
            </div>
        </Router>
        </>
    );
    }

    export default App;

## 12. Inside /src, create components folder:

    - Create Header.jsx file

## 13. In Header.jsx:

    - In /frontend instal:
    $ npm i react-icons
    import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
    import { Link } from 'react-router-dom';


    function Header() {
    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'>GoalSetter</Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                </li>
            </ul>
        </header>
    )
    }

## 14. App.js:

    import Header from './components/Header';
      return (
        <>
        <Router>
            <div className='container'>
            <Header />


    export default Header

## 15. Register.jsx:

    import { useState, useEffect } from 'react';
    import { FaUser } from 'react-icons/fa';

    function Register() {
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            password: '',
            password2: ''
        })

        const { name, email, password, password2 } = formData

        const onChange = (e) => {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }))
        }
        const onSubmit = (e) => {
            e.preventDefault()
        }

        return (
            <>
                <section className='heading'>
                    <h1>
                        <FaUser />Register
                    </h1>
                    <p>Please create an account</p>
                </section>
                <section className='form'>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input
                            type="text"
                            className="form-control"
                            id="name"
                            name='name'
                            value={name}
                            placeholder='Enter your name'
                            onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <input
                            type="email"
                            className="form-control"
                            id="email"
                            name='email'
                            value={email}
                            placeholder='Enter your e-mail'
                            onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <input
                            type="password"
                            className="form-control"
                            id="password"
                            name='password'
                            value={password}
                            placeholder='Enter password'
                            onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name='password2'
                            value={password2}
                            placeholder='Confirm password'
                            onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <button type='submit' className='btn btn-block'>Submit</button>
                        </div>
                    </form>
                </section>
            </>
        )
    }

    export default Register

## 16. Do the same for Login.jsx
