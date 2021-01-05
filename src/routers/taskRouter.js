const express = require("express");
const Tasks = require("../models/tasks");
const auth = require("../middleware/auth");
const router = new express.Router();
module.exports = router;

router.post("/tasks", auth, async ({ body, user }, res) => {
  //const task = new Tasks(req.body);
  const task = new Tasks({
    ...body,
    owner: user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send("Error!!" + error);
  }
});

//Using Async And Await
router.get("/tasks", auth, async (req, res) => {
  try {
    //1st Way
    // const task = await Tasks.find({ owner: req.user._id });
    // res.send(task);
    //2nd Way
    // await req.user.populate("tasks").execPopulate();
    // res.send(req.user.tasks);

    //3rd Way
    const match = {};
    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }
    const sort = {};
    if (req.query.sortBy) {
      const part = req.query.sortBy.split("_");
      sort[part[0]] = part[1] === "desc" ? -1 : 1;
    }
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: +req.query.limit,
          skip: +req.query.skip,
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

//Using Async And Await
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const task = await Tasks.findById(_id);
    const task = await Tasks.findOne({
      _id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

//Updating Task by Id
router.patch("/tasks/:id", auth, async (req, res) => {
  const userUpdates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidUpdate = userUpdates.every((updates) =>
    allowedUpdates.includes(updates)
  );
  if (!isValidUpdate) {
    const invalidProperty = [];
    userUpdates.forEach((key) => {
      if (!allowedUpdates.includes(key)) {
        invalidProperty.push(key);
      }
    });
    return res
      .status(404)
      .send(`Error:- Invalid Property-${invalidProperty} is Not Updated `);
  }
  const _id = req.params.id;
  try {
    const task = await Tasks.findOne({
      _id,
      owner: req.user._id,
    });
    //const task = await Tasks.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    if (!task) {
      return res.status(404).send();
    }
    userUpdates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send();
  }
});

//Deleting Task By It's Id
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    //  const task = await Tasks.findByIdAndDelete(req.params.id);
    const task = await Tasks.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send("Task is Deleted");
  } catch (error) {
    res.status(500).send();
  }
});
