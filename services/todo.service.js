const User = require("../models/user.model");
const Todo = require("../models/todo.model");
class TodoService {
  async createTodo(req, res, next) {
    const title = req.body.title;
    const content = req.body.content;
    const user = req.body.user;
    const todo = await Todo.create({ title, content, user });
    res.json(todo);
  }
  async getTodos(req, res, next) {
    const user = req.query.user;
    const todos = await Todo.find({ user }).populate("user",`username email`);
    res.json(todos);
  }
}

module.exports = new TodoService();
