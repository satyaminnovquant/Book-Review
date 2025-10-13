const { create, findOne } = require('../utils/sqlQueryHelper');

const createUser = async (username, email, hashedPassword) => {
    return await create('users', { username, email, password: hashedPassword });
};

const findUserByEmail = async (email) => {
    return await findOne('users', 'email', email);
};

module.exports = { createUser, findUserByEmail };