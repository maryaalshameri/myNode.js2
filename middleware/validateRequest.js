// middleware/validateRequest.js
const { validationResult } = require('express-validator');

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extracted = [];
  errors.array().map(err => extracted.push({ [err.param]: err.msg }));

  return res.status(422).json({
    success: false,
    errors: extracted
  });
}

module.exports = validateRequest;
