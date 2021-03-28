const express = require('express')
const auth = require('../../middleware/auth')
const Users = require('../../models/userCollection')
const multer = require('multer')
const sharp = require('sharp')
const sendEmail = require('../../account/account')
const router = new express.Router()

//signing User
router.post('/users', async (req, res) => {
   const user = new Users(req.body)
   const message = `Welcome ${user.name} to Task Manger Api. Let me know your Experience with api`
   try {
      await user.save()
      sendEmail(user.email, message)
      const token = await user.getAuthToken()
      res.status(201).send({
         user,
         token,
      }) //automatically calls JSON.Stringify()
   } catch (error) {
      res.status(400).send('Error!! ' + error)
   }
})
//logging User
router.post('/users/login', async (req, res) => {
   try {
      const user = await Users.findByCredential(req.body.email, req.body.password)
      const token = await user.getAuthToken()

      res.send({
         user,
         token,
      })
   } catch (error) {
      res.status(404).send({
         error: 'User Not Found',
      })
   }
})
//logout User
router.post('/users/logout', auth, (req, res) => {
   try {
      req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
      req.user.save()
      res.status(200).send({
         message: 'Logged Out!!',
      })
   } catch (error) {
      res.status(500).send({
         error: error.message,
      })
   }
})

//logout User From All Places
router.post('/users/logoutAll', auth, (req, res) => {
   try {
      req.user.tokens = []
      req.user.save()
      res.status(201).send({
         message: 'Logged Out !! From All',
      })
   } catch (error) {
      res.status(500).send({
         error: error.message,
      })
   }
})
const upload = multer({
   limits: {
      fileSize: 2000000,
   },
   // fileFilter(req, file, cb) {
   //   if (!file.originalname.match(/\.(png|jpg|jpeg|svg)$/)) {
   //     return cb(new Error("Please Upload image file only"))
   //   }
   //   cb(undefined, true)
   // },
})

router.post(
   '/users/me/avatar',
   auth,
   upload.single('avatar'),
   async (req, res) => {
      const buffer = await sharp(req.file.buffer)
         .png()
         .resize({
            width: 400,
            height: 400,
         })
         .toBuffer()
      req.user.avatar = buffer
      await req.user.save()
      res.status(200).send({
         message: 'FileUploaded',
      })
   },
   (error, _, res, next) => {
      res.status(400).send({
         error: error.message,
      })
   },
)

module.exports = router
