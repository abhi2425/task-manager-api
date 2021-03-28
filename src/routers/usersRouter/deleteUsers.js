const express = require('express')
const auth = require('../../middleware/auth')
const sendEmail = require('../../account/account')
const router = new express.Router()

router.delete('/users/me', auth, async (req, res) => {
   try {
      const message = 'Thanks for Using my app. Please let us Know what we are lacking '
      const user = await req.user.remove()
      sendEmail(user.email, message)
      res.send(user)
   } catch (error) {
      res.status(500).send()
   }
})
router.delete('/users/me/avatar', auth, async (req, res) => {
   req.user.avatar = undefined
   await req.user.save()
   res.status(200).send({
      message: 'Image Deleted',
   })
})

module.exports = router
