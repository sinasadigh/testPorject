const { body } = require("express-validator");
const User = require("../models/user.model");

class UserValidator {
  create() {
    return [
      //body.username
      body("username")
        .exists()
        .withMessage("Username is required!")
        .isLength({ max: 20 })
        .bail()
        .withMessage("Username length should be less than 20!")
        .custom(async (value, { req }) => {
          const username = await User.exists({ username: value });
          if (username) {
            throw new Error("Username already exists!");
          }
        }),
      body("password")
        .exists()
        .withMessage("Password is required!")
        .bail()
        .isLength({ min: 5, max: 20 })
        .withMessage("Password should be between 5 and 20 characters!"),
      body("email")
        .exists()
        .withMessage("Email is required!")
        .bail()
        .isEmail()
        .withMessage("Email is not valid!")
        .custom(async (value, { req }) => {
          const userEmail = await User.exists({ email: value });
          if (userEmail) {
            throw new Error("Email already exists!");
          }
        }),
    ];
  }
}

module.exports = new UserValidator();
