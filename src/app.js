require('./db/mongoose')
const express = require('express')
const cors = require('cors')

const createUsers = require('./routers/usersRouter/createUsers')
const readUsers = require('./routers/usersRouter/readUsers')
const updateUsers = require('./routers/usersRouter/updateUsers')
const deleteUsers = require('./routers/usersRouter/deleteUsers')

const createTask = require('./routers/taskRouter/createTask')
const readTask = require('./routers/taskRouter/readTask')
const updateTask = require('./routers/taskRouter/updateTask')
const deleteTask = require('./routers/taskRouter/deleteTask')

const app = express()
app.use(cors())
app.use(express.json())
app.use(
   express.urlencoded({
      extended: false,
   }),
)
app.use(createUsers)
app.use(readUsers)
app.use(updateUsers)
app.use(deleteUsers)

app.use(createTask)
app.use(readTask)
app.use(updateTask)
app.use(deleteTask)

module.exports = app
