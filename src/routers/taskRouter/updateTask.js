const express = require('express')
const Tasks = require('../../models/taskCollection')
const auth = require('../../middleware/auth')
const router = new express.Router()

//Updating Task by Id
router.patch('/tasks/:id', auth, async (req, res) => {
   const userUpdates = Object.keys(req.body)
   const allowedUpdates = ['description', 'completed']
   const isValidUpdate = userUpdates.every((updates) => allowedUpdates.includes(updates))
   if (!isValidUpdate) {
      const invalidProperty = []
      userUpdates.forEach((key) => {
         if (!allowedUpdates.includes(key)) {
            invalidProperty.push(key)
         }
      })
      return res.status(404).send(`Error:- Invalid Property-${invalidProperty} is Not Updated `)
   }
   const _id = req.params.id
   try {
      const task = await Tasks.findOne({
         _id,
         owner: req.user._id,
      })
      //const task = await Tasks.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
      if (!task) {
         return res.status(404).send()
      }
      userUpdates.forEach((update) => (task[update] = req.body[update]))
      await task.save()
      res.status(200).send(task)
   } catch (error) {
      res.status(500).send()
   }
})

module.exports = router
