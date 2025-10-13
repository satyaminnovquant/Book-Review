require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const { createTables } = require('./config/initDb');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3001;

const initializeDatabase = async () => {
    try {
        await db.execute('SELECT 1');
        console.log('✅ Database connected');
        await createTables();
    } catch (error) {
        console.error('❌ Database failed:', error.message);
        process.exit(1);
    }
};

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
    res.json({ message: '📚 Book Review API' });
});

app.use((error, req, res, next) => {
    console.error('❌ Server Error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ message: 'Server error' });
});

(async () => {
    await initializeDatabase();
    app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
})();
