const express = require ('express')
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController.js')
const router = express.Router()
const { protect } = require ('../middleware/authMiddleware')

//GET GOALS && POST GOAL
router.route('/').get(protect, getGoals).post(protect, setGoal)

//PUT GOAL && DELETE GOAL
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

module.exports = router