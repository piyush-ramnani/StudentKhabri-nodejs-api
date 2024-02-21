const express = require("express");
const { Router } = require("express");
const router = Router();
router.use(express.json());
const { Todo } = require("../db");

const { authMiddleware } = require("../middlewares/auth");

//--MIDDLEWARE

router.post("/create", authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  if (title && description) {
    try {
      const item = await Todo.create({
        title: title,
        description: description,
      });

      res.status(201).json(item);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.get("/all-todos", authMiddleware, async (req, res) => {
  try {
    const allItem = await Todo.find();

    res.status(201).json(allItem);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
