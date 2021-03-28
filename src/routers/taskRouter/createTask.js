const express = require('express')
const Tasks = require('../../models/taskCollection')
const auth = require('../../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async ({ body, user }, res) => {
   const task = new Tasks({
      ...body,
      owner: user._id,
   })
   try {
      await task.save()
      res.status(201).send(task)
   } catch (error) {
      res.status(400).send(error.message)
   }
})
module.exports = router
