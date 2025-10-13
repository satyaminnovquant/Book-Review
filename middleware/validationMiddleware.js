const { sendError } = require('../utils/responseUtils');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return sendError(res, error.details[0].message, 400);
    }
    next();
  };
};

module.exports = { validate };