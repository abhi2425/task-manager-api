const express = require('express')
const auth = require('../../middleware/auth')
const Users = require('../../models/userCollection')
const router = express.Router()

// User Profile After Logging in
router.get('/users/me', auth, (req, res) => {
   res.send(req.user)
})

router.get('/users/:id/avatar', async (req, res) => {
   try {
      const user = await Users.findById(req.params.id)
      if (!user || !user.avatar) {
         throw new Error('Image Not Found!')
      }
      res.set('Content-Type', 'image/png')
      res.status(200).send(user.avatar)
   } catch (error) {
      res.send({
         error: error.message,
      })
   }
})
module.exports = router
