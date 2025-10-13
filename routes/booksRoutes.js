const express = require('express');
const { getAllBooks, addBook, getBookById } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const { validate } = require('../middleware/validationMiddleware');
const { bookSchema } = require('../utils/validationSchemas');
const router = express.Router();

router.get('/', getAllBooks);
router.post('/', authMiddleware, validate(bookSchema), addBook);
router.get('/:id', getBookById);

module.exports = router;
