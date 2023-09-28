const router = require("express").Router();

const bcrypt = require("bcrypt");

const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(500).json({ msg: "email exist" });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hash, isAdmin });
    await newUser.save();

    console.log(hash);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
