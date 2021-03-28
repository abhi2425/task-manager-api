const express = require('express')
const auth = require('../../middleware/auth')
const router = express.Router()

router.patch('/users/me', auth, async ({ body, user }, res) => {
   const userUpdates = Object.keys(body)
   const allowedUpdates = ['name', 'age', 'email', 'password']
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
   try {
      userUpdates.forEach((update) => {
         user[update] = body[update]
      })
      await user.save()
      if (!user) {
         return res.status(404).send()
      }
      res.status(200).send(user)
   } catch (error) {
      res.status(500).send({
         error: 'error!!' + error.message,
      })
   }
})

module.exports = router
