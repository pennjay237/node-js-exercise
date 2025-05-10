import inquirer from 'inquirer';
import { pool } from '../db/db.mjs';

async function deleteContact() {
  const { id } = await inquirer.prompt([
    { name: 'id', message: 'Enter contact ID to delete:' }
  ]);

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Are you sure you want to delete contact with ID ${id}?`,
      default: false,
    },
  ]);

  if (!confirm) return console.log('Deletion canceled.');

  try {
    await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    console.log('Contact deleted successfully.');
  } catch (err) {
    console.error('Error deleting contact:', err.message);
  }
}

deleteContact();
