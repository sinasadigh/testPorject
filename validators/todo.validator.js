const { body } = require("express-validator");
const User = require("../models/user.model");

class TodoValidator {
  create() {
    return [
      //body.username
      body("title")
        .exists()
        .withMessage("Title is required!")
        .isLength({ max: 50 })
        .bail()
        .withMessage("Title length should be less than 50!"),
      body("content")
        .exists()
        .withMessage("Content is required!")
        .bail()
        .isLength({  max: 500 })
        .withMessage("Content length should be less than 500!"),
      body("user")
        .exists()
        .withMessage("User is required!")
        .isMongoId()
        .withMessage("Its not valid id!")
        .bail()
        .custom(async (value, { req }) => {
          const user = await User.exists({ _id: value });
          if (!user) {
            throw new Error("User does not exists!");
          }
        }),
    ];
  }
}

module.exports = new TodoValidator();
