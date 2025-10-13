const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const bookRoutes = require('./booksRoutes');
const reviewRoutes = require('./reviewsRoutes');

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;