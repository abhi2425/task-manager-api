require('dotenv').config()
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = require('../schemas/userSchema')
const Tasks = require('./taskCollection')

userSchema.virtual('tasks', {
   ref: 'Tasks',
   localField: '_id',
   foreignField: 'owner',
})
userSchema.methods.toJSON = function () {
   const userObject = this.toObject()
   delete userObject.password
   delete userObject.tokens
   delete userObject.avatar
   return userObject
}

userSchema.methods.getAuthToken = async function () {
   const token = jwt.sign(
      {
         _id: this._id.toString(),
      },
      process.env.SECRET_KEY,
      {
         expiresIn: '2 days',
      },
   )
   this.tokens = this.tokens.concat({
      token,
   })
   await this.save()
   return token
}

userSchema.statics.findByCredential = async (email, password) => {
   const user = await User.findOne({
      email: email,
   })

   if (!user) {
      throw new Error('E-Mail Not Found!!!')
   }
   const isMatch = bcryptjs.compare(password, user.password)
   if (!isMatch) {
      throw new Error('Unable To Login')
   }
   return user
}

//Hashing The Password Before Saving
userSchema.pre('save', async function (next) {
   const user = this

   if (user.isModified('password')) {
      user.password = await bcryptjs.hash(user.password, 8)
   }
   next()
})
userSchema.pre('remove', async function (next) {
   await Tasks.deleteMany({
      owner: this._id,
   })
   next()
})

const UserCollection = mongoose.model('User', userSchema)
module.exports = UserCollection
