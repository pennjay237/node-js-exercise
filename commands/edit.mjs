import inquirer from 'inquirer';
import { pool } from '../db/db.mjs';

async function editContact() {
  const { id } = await inquirer.prompt([
    { name: 'id', message: 'Enter contact ID to edit:' },
  ]);

  const { name, email, phone, address } = await inquirer.prompt([
    { name: 'name', message: 'New name:' },
    { name: 'email', message: 'New email:' },
    { name: 'phone', message: 'New phone:' },
    { name: 'address', message: 'New address:' },
  ]);

  try {
    await pool.query(
      'UPDATE contacts SET name=$1, email=$2, phone=$3, address=$4 WHERE id=$5',
      [name, email, phone, address, id]
    );
    console.log(' Contact updated.');
  } catch (err) {
    console.error(' Update failed:', err.message);
  }
}

editContact();
