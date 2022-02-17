const express = require ('express')
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalControllersjs')
const router = express.Router()

//GET GOALS && POST GOAL
router.route('/').get(getGoals).post(setGoal)

//PUT GOAL && DELETE GOAL
router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports = router