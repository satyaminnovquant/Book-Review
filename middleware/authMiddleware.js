const { verifyToken } = require('../utils/passwordUtils');
const { sendError } = require('../utils/responseUtils');

const auth = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return sendError(res, 'Access denied. No token provided.', 401);
        }

        const token = authHeader.replace('Bearer ', '').trim();
        const decoded = verifyToken(token);

        if (!decoded || !decoded.userId) {
            return sendError(res, 'Invalid token payload.', 401);
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT verification error:', error.message);
        return sendError(res, 'Invalid token.', 401);
    }
};

module.exports = auth;