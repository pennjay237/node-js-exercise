import inquirer from 'inquirer';
import { pool } from '../db/db.mjs';

async function editContact() {
  const { id } = await inquirer.prompt([{ name: 'id', message: 'Enter ID of contact to edit:' }]);

  const { name, email, phone, address } = await inquirer.prompt([
    { name: 'name', message: 'Enter new name:' },
    { name: 'email', message: 'Enter new email:' },
    { name: 'phone', message: 'Enter new phone:' },
    { name: 'address', message: 'Enter new address:' },
  ]);

  try {
    await pool.query(
      'UPDATE contacts SET name=$1, email=$2, phone=$3, address=$4 WHERE id=$5',
      [name, email, phone, address, id]
    );
    console.log('Contact updated successfully.');
  } catch (err) {
    console.error('Error updating contact:', err.message);
  }
}

editContact();
