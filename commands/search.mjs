import inquirer from 'inquirer';
import pool from '../db.mjs';
import consoleTable from 'console.table';

const { name } = await inquirer.prompt([
  { name: 'name', message: 'Search by name:' }
]);

try {
  const { rows } = await pool.query(
    'SELECT * FROM contacts WHERE LOWER(name) LIKE LOWER($1)',
    [`%${name}%`]
  );
  console.table(rows);
} catch (err) {
  console.error(' Error searching:', err.message);
}
