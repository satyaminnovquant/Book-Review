const Joi = require('joi');

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Add authError helper function
const authError = (error) => {
  return {
    success: false,
    message: error.details[0].message,
    errors: error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }))
  };
};

const userRegisterSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username cannot exceed 30 characters",
    "any.required": "Username is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

const validateRegister = (req, res, next) => {
  const { error } = userRegisterSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const response = authError(error);
    return res.status(422).send(response);
  }
  next(); 
};

const validateLogin = (req, res, next) => {
  const { error } = userLoginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const response = authError(error);
    return res.status(422).send(response);
  }
  next(); 
};

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  author_email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
  isbn: Joi.string().required(),
  description: Joi.string().optional()
});

const reviewSchema = Joi.object({
  book_id: Joi.number().integer().positive().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().optional()
});

module.exports = { validateLogin, validateRegister, bookSchema, reviewSchema };
