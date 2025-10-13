const { getAllBooks: getBooks, createBook, findBookById } = require('../models/BookModel');
const { sendSuccess, sendError } = require('../utils/responseUtils');

const getAllBooks = async (req, res) => {
    try {
        const books = await getBooks();
        return sendSuccess(res, 'Books retrieved successfully', books);
    } catch (error) {
        return sendError(res, 'Server error');
    }
};

const addBook = async (req, res) => {
    try {
        const { title, author, isbn, description } = req.body;
        const bookId = await createBook(title, author, isbn, description);
        return sendSuccess(res, 'Book added successfully', { bookId }, 201);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return sendError(res, 'Book with this ISBN already exists', 400);
        }
        return sendError(res, 'Server error');
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await findBookById(req.params.id);
        if (!book) {
            return sendError(res, 'Book not found', 404);
        }
        return sendSuccess(res, 'Book retrieved successfully', book);
    } catch (error) {
        return sendError(res, 'Server error');
    }
};

module.exports = { getAllBooks, addBook, getBookById };