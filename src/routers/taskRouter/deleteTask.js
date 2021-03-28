const express = require('express')
const Tasks = require('../../models/taskCollection')
const auth = require('../../middleware/auth')
const router = new express.Router()

//Deleting Task By It's Id
router.delete('/tasks/:id', auth, async (req, res) => {
   try {
      //  const task = await Tasks.findByIdAndDelete(req.params.id);
      const task = await Tasks.findOneAndDelete({
         _id: req.params.id,
         owner: req.user._id,
      })
      if (!task) {
         return res.status(404).send()
      }
      res.send('Task is Deleted')
   } catch (error) {
      res.status(500).send()
   }
})

module.exports = router
