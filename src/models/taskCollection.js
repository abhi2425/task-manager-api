const mongoose = require('mongoose')
const taskSchema = require('../schemas/taskSchema')

const TasksCollection = mongoose.model('Tasks', taskSchema)
module.exports = TasksCollection
