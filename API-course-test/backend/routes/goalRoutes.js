const express = require('express');
const router = express.Router();
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalControllers');
const { protect } = require('../middleware/authMiddleware')

//get and set goal
router.route('/').get(protect, getGoals).post(protect, setGoal)

//Update and delete goal
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router