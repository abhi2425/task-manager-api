const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
         uppercase: true,
      },
      email: {
         type: String,
         required: true,
         trim: true,
         unique: true,
         validate(value) {
            if (!validator.isEmail(value)) {
               throw new Error('Not Valid Email!!')
            }
         },
      },
      age: {
         type: Number,
         default: 0,
         validate(value) {
            if (value < 0) {
               throw new Error('Age can not be negative')
            }
         },
      },
      password: {
         required: true,
         type: String,
         trim: true,
         validate(value) {
            if (value.length < 8) {
               throw new Error('Password Must be greater Than 7 Characters')
            } else if (value.toLowerCase().includes('password')) {
               throw new Error("Password can't set be password")
            }
         },
      },
      tokens: [
         {
            token: {
               type: String,
               required: true,
            },
         },
      ],
      avatar: {
         type: Buffer,
      },
   },
   {
      timestamps: true,
   },
)

module.exports = userSchema
