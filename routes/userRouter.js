const express = require("express");
const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
router.use(express.json());

const { User } = require("../db");
const { userInputValidation } = require("../middlewares/inputValidation");

//--LOCAL MIDDLEWARE

//--ROUTES--
router.post("/signup", userInputValidation, async (req, res) => {
  const { firstname, lastname, username, password } = req.userData;

  try {
    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      const user = await User.create({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
      });

      return res.status(201).json({ message: "Signed up successfully!" });
    } else {
      return res.status(409).json({ message: "Username already in use." });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    try {
      const existingUser = await User.findOne({ username: username });
      console.log(existingUser.password);
      if (existingUser && password == existingUser.password) {
        const payload = { username: username };
        const token = jwt.sign(payload, JWT_SECRET);

        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }
});

module.exports = router;
