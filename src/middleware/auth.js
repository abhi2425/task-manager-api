require('dotenv').config()
const Users = require('../models/userCollection')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
   try {
      const token = req.header('Authorization').replace('Bearer ', '')
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const user = await Users.findOne({
         _id: decoded._id,
         'tokens.token': token,
      })
      if (!user) throw new Error()
      req.token = token
      req.user = user
      next()
   } catch (error) {
      res.status(401).send({
         error: 'Invalid Authenticate',
      })
   }
}
module.exports = auth
