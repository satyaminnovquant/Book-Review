const { verifyToken } = require('../utils/passwordUtils');
const { sendError } = require('../utils/responseUtils');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return sendError(res, 'Access denied', 401);
    }
    
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return sendError(res, 'Invalid token', 401);
    }
};

module.exports = auth;