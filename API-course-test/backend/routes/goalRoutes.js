const express = require('express');
const router = express.Router();
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalControllers');


//get and set goal
router.route('/').get(getGoals).post(setGoal)

//Update and delete goal
router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router