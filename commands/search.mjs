import inquirer from 'inquirer';
import { pool } from '../db/db.mjs';

async function searchContact() {
  const { name } = await inquirer.prompt([{ name: 'name', message: 'Enter name to search:' }]);

  try {
    const res = await pool.query('SELECT * FROM contacts WHERE name ILIKE $1', [`%${name}%`]);
    console.table(res.rows);
  } catch (err) {
    console.error('Error searching contact:', err.message);
  }
}

searchContact();
