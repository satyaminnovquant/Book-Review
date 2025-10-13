const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { hashPassword, comparePassword, generateToken, verifyToken };