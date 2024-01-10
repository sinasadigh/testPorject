const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }


  const extractedErrors = [];
  validationErrors
    .array()
    .map((err) => extractedErrors.push({ message: err.msg, field: err.path }));

  res.json(extractedErrors);
};

module.exports = { validate };
