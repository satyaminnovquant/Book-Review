// const db = require('./db');

// const createTables = async () => {
//   try {
//     // Create users table
//     await db.execute(`
//       CREATE TABLE IF NOT EXISTS users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         username VARCHAR(50) UNIQUE NOT NULL,
//         email VARCHAR(100) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);

//     // Create books table
//     await db.execute(`
//       CREATE TABLE IF NOT EXISTS books (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         author VARCHAR(255) NOT NULL,
//          author_email VARCHAR(255), 
//         isbn VARCHAR(20) UNIQUE,
//         description TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);

//     // Create reviews table
//     await db.execute(`
//       CREATE TABLE IF NOT EXISTS reviews (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         user_id INT NOT NULL,
//         book_id INT NOT NULL,
//         rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
//         comment TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//         FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
//         UNIQUE KEY unique_user_book (user_id, book_id)
//       )
//     `);

//     console.log('✅ Database tables created successfully');
//   } catch (error) {
//     console.error('Error creating tables:', error.message);
//     throw error;
//   }
// };

// module.exports = { createTables };

const db = require('./db');

const createTables = async () => {
  try {
    // Create users table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create books table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS books (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        author VARCHAR(100) NOT NULL,
        author_email VARCHAR(100),
        isbn VARCHAR(13) UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_author (author),
        INDEX idx_isbn (isbn)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create reviews table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id INT UNSIGNED NOT NULL,
        book_id INT UNSIGNED NOT NULL,
        rating TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE,
        UNIQUE KEY unique_user_book (user_id, book_id),
        INDEX idx_book_rating (book_id, rating)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error.message);
    throw error;
  }
};

module.exports = { createTables };
