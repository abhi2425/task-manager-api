const express = require("express");
require("./db/mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(taskRouter);
app.listen(port, () => {
  console.log("Server is up at ", port);
});
