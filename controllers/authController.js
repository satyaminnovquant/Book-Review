const { generateToken, hashPassword, comparePassword } = require('../utils/passwordUtils');
const { createUser, findUserByEmail } = require('../models/userModel');
const { sendSuccess, sendError } = require('../utils/responseUtils');

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return sendError(res, 'User already exists', 400);
    }

    const hashedPassword = await hashPassword(password);
    const userId = await createUser(username, email, hashedPassword);

    return sendSuccess(res, 'User created successfully', { userId }, 201);
  } catch (error) {
    console.error('Signup error:', error.message);
    console.error('Error code:', error.code);
    if (error.code === 'ER_DUP_ENTRY') {
      return sendError(res, 'User already exists', 400);
    }
    return sendError(res, 'Server error');
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    console.log('User found:', !!user);

    if (!user || !(await comparePassword(password, user.password))) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const token = generateToken({ userId: user.id });
    const userData = { token, userId: user.id, username: user.username, email: user.email };

    return sendSuccess(res, 'Login successful', userData);
  } catch (error) {
    console.error('Login error:', error.message);
    console.error('Login stack:', error.stack);
    return sendError(res, 'Server error');
  }
};

module.exports = { signup, login };
