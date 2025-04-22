import { pool } from '../db/db.mjs';
import consoleTable from 'console.table';

async function listContacts() {
  try {
    const res = await pool.query('SELECT * FROM contacts');
    console.table(res.rows);
  } catch (err) {
    console.error(' Failed to fetch contacts:', err.message);
  }
}

listContacts();
