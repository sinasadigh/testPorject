const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const UserValidator = require("./validators/user.validator");
const { validate } = require("./middleware/validate");
const UserService = require("./services/user.service");
const TodoService = require("./services/todo.service");
const TodoValidator = require("./validators/todo.validator");
const app = express();

app.use(bodyParser.json());

app.get("/users/list", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

app.post(
  "/users/add",
  UserValidator.create(),
  validate,
  UserService.createUser
);

app.post("/todo/add", TodoValidator.create(), validate, TodoService.createTodo);

app.get("/todo", TodoService.getTodos);

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const user = await User.findOne({ _id });
  res.json(user);
});

app.put("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.updateOne({ _id }, { username, email, password });
  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const user = await User.deleteOne({ _id });
  res.json(user);
});

const server = app.listen(3000, async () => {
  await mongoose.connect("mongodb://localhost:27017/todoList").then(() => {
    console.log("DB is connected!");
  });
  console.log("server is listening to port 3000");
});
