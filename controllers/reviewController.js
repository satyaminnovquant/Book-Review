const { getReviewsByBookId, createReview, getReviewsByUserId } = require('../models/ReviewModel');
const { sendSuccess, sendError } = require('../utils/responseUtils');
const { sendThankYouReviewEmail, sendAuthorReviewNotificationEmail } = require('../services/emailService');
const { findBookById } = require('../models/BookModel');

const getReviewsByBook = async (req, res) => {
    try {
        const reviews = await getReviewsByBookId(req.params.bookId);
        return sendSuccess(res, 'Reviews retrieved successfully', reviews);
    } catch (error) {
        return sendError(res, 'Server error');
    }
};

// const addReview = async (req, res) => {
//     try {
//         const { book_id, rating, comment } = req.body;
//         const reviewId = await createReview(req.user.userId, book_id, rating, comment);
//         if (req.user.userId !== req.body.user_id) {
//             const { sendThankYouReviewEmail } = require('../services/emailService');
//             sendThankYouReviewEmail(req.user.email, req.user.username, book_id);
//         }
//         return sendSuccess(res, 'Review added successfully', { reviewId }, 201);
//     } catch (error) {
//         if (error.code === 'ER_DUP_ENTRY') {
//             return sendError(res, 'You have already reviewed this book', 400);
//         }
//         return sendError(res, 'Server error');
//     }
// };
const addReview = async (req, res) => {
    try {
        // console.log("req.user:", req.user);
        console.log("req.user:", req.user);
        const { book_id, rating, comment } = req.body;
        const userId = req.user.userId;
        const userEmail = req.user.email;
        const username = req.user.username;

       
        const book = await findBookById(book_id);
        if (!book) {
            return sendError(res, 'Book not found', 404);
        }

        const reviewId = await createReview(userId, book_id, rating, comment);
 console.log(userEmail);
        await sendThankYouReviewEmail(userEmail, username, book.title);
       
        if (book.author_email) {
            await sendAuthorReviewNotificationEmail(
                book.author_email,
                book.author || "Author",
                book.title,
                username,
            );
        }

        return sendSuccess(res, 'Review added successfully', { reviewId }, 201);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return sendError(res, 'You have already reviewed this book', 400);
        }

        console.error('✗ Error adding review:', error);
        return sendError(res, 'Server error', 500);
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