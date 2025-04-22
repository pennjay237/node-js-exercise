import inquirer from 'inquirer';
import { pool } from '../db/db.mjs';

async function deleteContact() {
  const { id } = await inquirer.prompt([
    { name: 'id', message: 'Enter contact ID to delete:' },
  ]);

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you sure you want to delete this contact?',
    },
  ]);

  if (!confirm) return console.log(' Deletion cancelled.');

  try {
    await pool.query('DELETE FROM contacts WHERE id=$1', [id]);
    console.log('🗑️ Contact deleted.');
  } catch (err) {
    console.error(' Deletion failed:', err.message);
  }
}

deleteContact();
