const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // owner: {
    //   name: {
    //     type: String,
    //   },
    //   ownerId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Users",
    //   },
    // },
  },
  {
    timestamps: true,
  }
);
const Tasks = mongoose.model("Tasks", taskSchema);
module.exports = Tasks;
