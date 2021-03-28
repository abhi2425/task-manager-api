const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema(
   {
      description: {
         type: String,
         trim: true,
      },
      completed: {
         type: Boolean,
      },
      owner: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
      orders: [
         {
            products: {
               type: Object,
               required: true,
            },
         },
      ],
   },
   {
      timestamps: true,
   },
)
module.exports = taskSchema
