const { findAll, create, findOne } = require('../utils/sqlQueryHelper');

const getAllBooks = async () => {
    return await findAll('books');
};

const createBook = async (title, author,author_email, isbn, description) => {
    return await create('books', { title, author,author_email, isbn, description });
};

const findBookById = async (id) => {
    return await findOne('books', 'id', id);
};

module.exports = { getAllBooks, createBook, findBookById };