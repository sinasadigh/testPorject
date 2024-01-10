const User = require("../models/user.model");
class UserService {
  async createUser(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.create({ username, email, password });

    res.json(user);
  }
}

module.exports = new UserService();
