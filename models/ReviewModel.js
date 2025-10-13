const { create, executeQuery } = require('../utils/sqlQueryHelper');

const getReviewsByBookId = async (bookId) => {
    return await executeQuery(`
        SELECT r.*, u.username 
        FROM reviews r 
        JOIN users u ON r.user_id = u.id 
        WHERE r.book_id = ? 
        ORDER BY r.created_at DESC
    `, [bookId]);
};

const createReview = async (userId, bookId, rating, comment) => {
    return await create('reviews', { user_id: userId, book_id: bookId, rating, comment });
};

const getReviewsByUserId = async (userId) => {
    return await executeQuery(`
        SELECT r.*, b.title, b.author 
        FROM reviews r 
        JOIN books b ON r.book_id = b.id 
        WHERE r.user_id = ? 
        ORDER BY r.created_at DESC
    `, [userId]);
};

module.exports = { getReviewsByBookId, createReview, getReviewsByUserId };