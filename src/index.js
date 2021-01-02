const express = require("express");
require("./db/mongoose");
require("dotenv").config();

const app = express();
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up at ", port);
});
