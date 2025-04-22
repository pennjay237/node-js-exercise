import inquirer from 'inquirer';
import { pool } from '../db/db.mjs';

async function searchContact() {
  const { name } = await inquirer.prompt([
    { name: 'name', message: 'Enter name to search:' },
  ]);

  try {
    const res = await pool.query(
      'SELECT * FROM contacts WHERE LOWER(name) LIKE $1',
      [`%${name.toLowerCase()}%`]
    );
    console.table(res.rows);
  } catch (err) {
    console.error(' Search failed:', err.message);
  }
}

searchContact();
