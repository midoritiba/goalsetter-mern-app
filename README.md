# goalsetter-mern-app

RESTful API with Node.js, Express, MongoDB and Mongoose.

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
    "start": "node backend/server.js",
    "server": "nodemon backend/server.js"

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

## 5 . In userControllers still:

    - wrap our variables in asyncHandler + async functions

## 6. userController > working on const registerUser:

    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error ('Please add all fields')
    }

    //Check if the user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
        }else{
            res.status(400)
            throw new Error ('Invalid user data')
        }

## 7. Authenticate/Login user > const loginUser:

    const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    //Check for user email
    const user = await User.findOne({email})
    //Compare password passed with the user that just tried to register with his password in the data
    const comparePassword = await bcrypt.compare(password, user.password)

    //Matching the password
    if(user && comparePassword){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else{
        res.status(400)
        throw new Error ('Invalid credentions')
    }
    res.json({message: 'Login User'})
    })

## 8. Create a Token - we need to use it in loginUser and registerUser

    - We need to create in .env a JWT_SECRET
    (this case = abc123)
    - create a generateToken function:
    //Generate Token(JWT)
    const generateToken = (id) =>{
        return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn = '30d'
        })
    }

    - create a token option in loginUser and registerUser:
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)

## 9. We need now to protect routes, the getMe function will have a PRIVATE access:

    - create in middleware file called 'authMiddleware.js':
    const jwt = require ('jsonwebtoken')
    const asyncHandler = require ('express-async-handler')
    const User = require ('../models/userModel')

    const protect = asyncHandler(async(req, res, next) => {
        let token

        if(req.header.authorization && req.header.authorization.startsWith('Bearer')){
            try {
                //Get token from Header
                token = req.header.authorization.split(' ')[1]

                //Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET)

                //Get user from the token - since we generated the token using the id (function generateToken in userController), thats what we use to try to find the user. But we dont want the password to be display
                req.user = await User.findById(decoded.id).select('-password')

                next()
            } catch (error) {
                console.log(error)
                //401 status means not authorized
                res.status(401)
                throw new Error('Not authorized')
            }
        }
        if(!token){
            res.status(401)
            throw new Error('Not authorized, no token')
        }
    })

module.exports = { protect }

## 10. Now we can go back to server.js:

        - use the protect middleware in the function getMe:
        const { protect } = require ('../middleware/authMiddleware')

        //GET - Display user data
        router.get('/me',protect, getMe)

## 11. Back to userController, set up the function getMe:

    const getMe = asyncHandler(async(req, res) => {
        const { _id, name, email } = await User.findById(req.user.id)

        res.status(200).json({
            id: _id,
            name,
            email
        })

    }
    )

## 12. Now we can protect all our goalRoutes as well in:

    const { protect } = require ('../middleware/authMiddleware')

    //GET GOALS && POST GOAL
    router.route('/').get(protect, getGoals).post(protect, setGoal)

    //PUT GOAL && DELETE GOAL
    router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

## 13. Now we go to goalController:

    Here we need to setup a user attached to the goal. Because now we have a relationship between those two routes:
    const getGoals = asyncHandler(async(req, res)=> {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
    })

## 14. We also need to connect the user with the function setGoal:

    const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error ('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
    })

## 15. We want to also prevent users to update and delete others users goals, in goalController:

        const updateGoal = asyncHandler(async(req, res) => {
        const goal = await Goal.findById(req.params.id)

        if(!goal){
            res.status(400)
            throw new Error('Goal not found')
        }
        const user = await User.findById(req.user.id)

        //Check for user
        if(!user){
            res.status(401)
            throw new Error('User not found')
        }
        //Make sure the logged in user matches the goal user
        if(goal.user.toString() !== user.id){
            res.status(401)
            throw new Error('User not authorized')
        }

        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
        })
        res.status(200).json(updatedGoal)
    })

## 16. We do the same thing for the function deleteGoal:

    const deleteGoal = asyncHandler(async(req, res) => {
        const goal = await Goal.findById(req.params.id)

        if(!goal){
            res.status(400)
            throw new Error('Goal not found :(')
        }

        const user = await User.findById(req.user.id)

        //Check for user
        if(!user){
            res.status(401)
            throw new Error('User not found')
        }
        //Make sure the logged in user matches the goal user
        if(goal.user.toString() !== user.id){
            res.status(401)
            throw new Error('User not authorized')
        }

        await goal.remove()
        res.status(200).json({message: `Goal with id "${req.params.id}" deleted`})
    })

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

    import { useState, useEffect } from 'react';
    import { FaSignInAlt } from 'react-icons/fa';

    function Login() {
        const [formData, setFormData] = useState({
            email: '',
            password: ''
        })

        const { email, password} = formData

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
                        <FaSignInAlt />Login
                    </h1>
                    <p>Login and start setting goals</p>
                </section>
                <section className='form'>
                    <form onSubmit={onSubmit}>
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
                            <button type='submit' className='btn btn-block'>Submit</button>
                        </div>
                    </form>
                </section>
            </>
        )
    }

    export default Login

## 17. Git add ., git commit -m 'Added frontend UI'

## 18. In package.json in the root:

    $ npm i -D concurrently
    - add a new script:
    "dev": "concurrently \"npm run server\"  \"npm run client\" "

    - this way we can run both backend and frontend with the command $ npm run dev

## 19. In the feature folder:

    - Create a folder /auth
    - Create a file authSlice.js
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user'))

    const initialState = {
        user: user ? user : null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
    }

    export const authSlice = createSlice({
        name:'auth',
        initialState,
        reducer: {
            reset: (state) =>{
                state.isLoading = false
                state.isSuccess = false
                state.isError = false
                state.message = ''
            }
        },
        extraReducers: () => {}
    })

    export const { reset } = authSlice.actions
    export default authSlice.reducer

## 20. app > store.js:

    import { configureStore } from '@reduxjs/toolkit';
    import authReducer from '../features/auth/authSlice'

    export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    });

## 21. Open Redux Dev Tool and check the auth state

## 22. In the terminal /frontend:

    $npm i axios react-toastify

## 23. /features/auth:

    - Create a file called authService.js
    import axios from 'axios';

    const API_URL = '/api/users'

    // Register user
    const register = async (userData) => {
        const response = await axios.post(API_URL, userData)

        if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
    }

    const authService = {
        register
    }

    export default authService

## 24. Back to authSlice.js:

    import authService from './authService';

    ...

    // Register user
    export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }

    } )

## 25. In package.json of FRONTEND:

    - add bellow "version":
      "proxy": "http://localhost:5000",

## 26. Back to authSlice.js

        extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null

## 27. In Register.jsx:

    import { useSelector, useDispatch } from 'react-redux'
    import { useNavigate } from 'react-router-dom'
    import { toast } from 'react-toastify'

## 28. To use the toast method, we need to go back to App.js:

    import { ToastContainer } from 'react-toastify'
    import 'react-toastify/dist/ReactToastify.css'

    - bellow Router add the component: <ToastContainer/ >

## 29. In Register.jsx:

    import { register, reset } from '../features/auth/authSlice'
    import { useState, useEffect } from 'react';
    import { useSelector, useDispatch } from 'react-redux'
    import { useNavigate } from 'react-router-dom'
    import { toast } from 'react-toastify'
    import { FaUser } from 'react-icons/fa';
    import { register, reset } from '../features/auth/authSlice'

    function Register() {
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            password: '',
            password2: ''
        })

        const { name, email, password, password2 } = formData

        const navigate = useNavigate()
        const dispatch = useDispatch()

        const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

        useEffect(() => {
            if(isError){
                toast.error(message)
            }
            if(isSuccess || user){
                navigate('/')
            }
            dispatch(reset())
        }, [user, isError, isSuccess, message, navigate, dispatch])

        const onChange = (e) => {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }))
        }
        const onSubmit = (e) => {
            e.preventDefault()

            if(password !== password2){
                toast.error('Password do not match')
            } else{
                const userData = {
                    name,
                    email,
                    password
                }

                dispatch(register(userData))
            }
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

## 30. Create a component Spinner.jsx

    function Spinner() {
    return (
        <div className="loadingSpinnerContainer">
            <div className="loadingSpinner"></div>
        </div>
    )
    }

    export default Spinner

## 31. Back to Register.jsx:

    import Spinner from '../components/Spinner';

    - right above 'return':
    if(isLoading){
        return <Spinner />
    }

## 32. Create a Logout. Go to authService.js

    // Logout user
    const logout = () => {
    localStorage.removeItem('user')
    }

## 33. Go to authSlice.js:

    export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
    })

## 34. Header.jsx:
