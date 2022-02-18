const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

//@desc Get goals
//@route GET /api/goals
//@access PRIVATE
const getGoals = asyncHandler(async(req, res)=> {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

//@desc Set goal
//@route POST /api/goals
//@access PRIVATE
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error ('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})

//@desc Update Goal
//@route PUT /api/goals/:id
//@access PRIVATE
const updateGoal = asyncHandler(async(req, res) => {
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

//@desc Delete Goal
//@route DELETE /api/goals/:id
//@access PRIVATE
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found :(')
    }

    await goal.remove()
    res.status(200).json({message: `Goal with id "${req.params.id}" deleted`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}