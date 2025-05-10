import { pool } from '../db/db.mjs';

async function listContacts() {
  try {
    const res = await pool.query('SELECT * FROM contacts');
    console.table(res.rows);
  } catch (err) {
    console.error('Error listing contacts:', err.message);
  }
}

listContacts();
