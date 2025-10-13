const express = require('express');
const { signup, login } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../utils/validationSchemas');
const router = express.Router();

router.post('/signup', validateRegister, signup);
router.post('/login', validateLogin, login);

module.exports = router;
