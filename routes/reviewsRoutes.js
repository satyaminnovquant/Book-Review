const express = require('express');
const { getReviewsByBook, addReview, getUserReviews } = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const { reviewSchema } = require('../utils/validationSchemas');
const router = express.Router();

router.get('/user', auth, getUserReviews);
router.get('/book/:bookId', getReviewsByBook);
router.post('/', auth, validate(reviewSchema), addReview);

module.exports = router;