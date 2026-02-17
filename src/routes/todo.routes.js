const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.post("/", async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(201).json(todo);
});

router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
