
import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'penn',       
  host: 'localhost',
  database: 'penndb', 
  password: 'pennjude',
  port: 5432,
});

export async function createTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT
      )
    `);
    console.log(' Contact table created or verified.');
  } catch (err) {
    console.error(' Error creating table:', err.message);
  }
}
