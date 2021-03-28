const express = require('express')
const Tasks = require('../../models/taskCollection')
const auth = require('../../middleware/auth')
const router = new express.Router()

//Using Async And Await
router.get('/tasks', auth, async (req, res) => {
   try {
      //1st Way
      // const task = await Tasks.find({ owner: req.user._id });
      // res.send(task);
      //2nd Way
      // await req.user.populate("tasks").execPopulate();
      // res.send(req.user.tasks);

      //3rd Way
      const match = {}
      if (req.query.completed) {
         match.completed = req.query.completed === 'true'
      }
      const sort = {}
      if (req.query.sortBy) {
         const part = req.query.sortBy.split('_')
         sort[part[0]] = part[1] === 'desc' ? -1 : 1
      }
      await req.user
         .populate({
            path: 'tasks',
            match,
            options: {
               limit: +req.query.limit,
               skip: +req.query.skip,
               sort,
            },
         })
         .execPopulate()
      res.send(req.user.tasks)
   } catch (error) {
      res.status(500).send({
         error: error.message,
      })
   }
})

//Using Async And Await
router.get('/tasks/:id', auth, async (req, res) => {
   const _id = req.params.id
   try {
      const task = await Tasks.findOne({
         _id,
         owner: req.user._id,
      })
      if (!task) {
         return res.status(404).send()
      }
      res.status(200).send(task)
   } catch (error) {
      res.status(500).send({
         error: error.message,
      })
   }
})

module.exports = router
