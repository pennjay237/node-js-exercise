import inquirer from 'inquirer';
import pool from '../db.mjs';

const { id } = await inquirer.prompt([
  { name: 'id', message: 'Enter ID of contact to delete:' }
]);

try {
  await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
  console.log(' Contact deleted successfully!');
} catch (err) {
  console.error(' Error deleting contact:', err.message);
}
