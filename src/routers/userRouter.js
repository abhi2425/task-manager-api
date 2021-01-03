const express = require("express");
const Users = require("../models/users");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/users");
const sendEmail = require("../account/account");
const router = new express.Router();
module.exports = router;

//signing User
router.post("/users", async (req, res) => {
  const user = new Users(req.body);
  const message = `Welcome ${user.name} to Task Manger Api. Let me know your Experience with api`;
  try {
    await user.save();
    sendEmail(user.email, message);
    const token = await user.getAuthToken();
    res.status(201).send({
      user,
      token,
    }); //automatically calls JSON.Stringify()
  } catch (error) {
    res.status(400).send("Error!! " + error);
  }
});
//logging User
router.post("/users/login", async (req, res) => {
  try {
    const user = await Users.findByCredential(
      req.body.email,
      req.body.password
    );
    const token = await user.getAuthToken();

    res.send({
      user,
      token,
    });
  } catch (error) {
    res.status(404).send({
      error: "User Not Found",
    });
  }
});
//logout User
router.post("/users/logout", auth, (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    req.user.save();
    res.status(200).send({
      message: "Logged Out!!",
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

//logout User From All Places
router.post("/users/logoutAll", auth, (req, res) => {
  try {
    req.user.tokens = [];
    req.user.save();
    res.status(201).send({
      message: "Logged Out !! From All",
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

// User Profile After Logging in
router.get("/users/me", auth, (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async ({ body, user }, res) => {
  const userUpdates = Object.keys(body);
  const allowedUpdates = ["name", "age", "email", "password"];
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
  try {
    userUpdates.forEach((update) => {
      user[update] = body[update];
    });
    await user.save();
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      error: "error!!" + error.message,
    });
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    const message =
      "Thanks for Using my app. Please let us Know what we are lacking ";
    const user = await req.user.remove();
    sendEmail(user.email, message);
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});
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
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({
        width: 400,
        height: 400,
      })
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.status(200).send({
      message: "FileUploaded",
    });
  },
  (error, _, res, next) => {
    res.status(400).send({
      error: error.message,
    });
  }
);
router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error("Image Not Found!");
    }
    res.set("Content-Type", "image/png");
    res.status(200).send(user.avatar);
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});
router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.status(200).send({
    message: "Image Deleted",
  });
});
