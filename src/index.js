const express = require("express");
require("./db/mongoose");
require("dotenv").config()

const app = express();
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up at ", port);
});
// const Users = require("./models/users");
// const Tasks = require("./models/tasks");
// const main = async () => {
//   const task = await Tasks.findById("5fef79d67f682f273ce14481");
//   await task.populate("owner").execPopulate();
//   console.log(task);

//   //   Tasks.findById("5fef79d67f682f273ce14481").then((task) => {
//   //     task
//   //       .populate("owner")
//   //       .execPopulate()
//   //       .then((data) => console.log(data));
//   //   });

//   const user = await Users.findById("5fef27afbe60b7255cc56644");
//   await user.populate("tasks").execPopulate();
//   console.log(user);
// };
// main();