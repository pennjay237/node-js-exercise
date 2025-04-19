import pool from '../db.mjs';
import consoleTable from 'console.table';

try {
  const { rows } = await pool.query('SELECT * FROM contacts');
  console.table(rows);
} catch (err) {
  console.error(' Error:', err.message);
}
