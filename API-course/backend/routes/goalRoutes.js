const express = require('express');
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const router = express.Router();

//get and post route
router.route('/').get(getGoals).post(setGoal)

//put and delete route
router.route('/:id').put(updateGoal).delete(deleteGoal)


module.exports = router