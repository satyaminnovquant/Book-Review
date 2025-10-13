const { getReviewsByBookId, createReview, getReviewsByUserId } = require('../models/ReviewModel');
const { sendSuccess, sendError } = require('../utils/responseUtils');

const getReviewsByBook = async (req, res) => {
    try {
        const reviews = await getReviewsByBookId(req.params.bookId);
        return sendSuccess(res, 'Reviews retrieved successfully', reviews);
    } catch (error) {
        return sendError(res, 'Server error');
    }
};

const addReview = async (req, res) => {
    try {
        const { book_id, rating, comment } = req.body;
        const reviewId = await createReview(req.user.userId, book_id, rating, comment);
        return sendSuccess(res, 'Review added successfully', { reviewId }, 201);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return sendError(res, 'You have already reviewed this book', 400);
        }
        return sendError(res, 'Server error');
    }
};

const getUserReviews = async (req, res) => {
    try {
        const reviews = await getReviewsByUserId(req.user.userId);
        return sendSuccess(res, 'User reviews retrieved successfully', reviews);
    } catch (error) {
        return sendError(res, 'Server error');
    }
};

module.exports = { getReviewsByBook, addReview, getUserReviews };