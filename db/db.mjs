
import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: 'penn',          
  host: 'localhost',
  database: 'penndb',    
  password: 'pennjude',
  port: 5432,
});

export async function createTables() {
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
    console.log(' Tables checked/created.');
  } catch (err) {
    console.error(' Error creating tables:', err.message);
  }
}