const db = require('../config/db');

const findOne = async (table, field, value) => {
    try {
        const [rows] = await db.execute(`SELECT * FROM ${table} WHERE ${field} = ?`, [value]);
        return rows[0];
    } catch (error) {
        console.error(`Error in findOne - Table: ${table}, Field: ${field}:`, error.message);
        throw error;
    }
};

const findAll = async (table, orderBy = 'created_at DESC') => {
    try {
        const [rows] = await db.execute(`SELECT * FROM ${table} ORDER BY ${orderBy}`);
        return rows;
    } catch (error) {
        console.error(`Error in findAll - Table: ${table}:`, error.message);
        throw error;
    }
};

const create = async (table, data) => {
    try {
        const fields = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);
        
        const [result] = await db.execute(
            `INSERT INTO ${table} (${fields}) VALUES (${placeholders})`,
            values
        );
        return result.insertId;
    } catch (error) {
        console.error(`Error in create - Table: ${table}:`, error.message);
        throw error;
    }
};

const executeQuery = async (query, params = []) => {
    try {
        const [rows] = await db.execute(query, params);
        return rows;
    } catch (error) {
        console.error('Error in executeQuery:', error.message);
        throw error;
    }
};

module.exports = { findOne, findAll, create, executeQuery };