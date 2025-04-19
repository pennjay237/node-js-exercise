import inquirer from 'inquirer';
import pool from '../db.mjs';
import { isValidEmail, isValidPhone } from '../utils/validate.mjs';

const { id } = await inquirer.prompt([
  { name: 'id', message: 'Enter contact ID to edit:' }
]);

const { name, email, phone, address } = await inquirer.prompt([
  { name: 'name', message: 'New Name:' },
  { name: 'email', message: 'New Email:' },
  { name: 'phone', message: 'New Phone:' },
  { name: 'address', message: 'New Address:' }
  { name: 'group', message: 'New Address:' }
]);

if (!isValidEmail(email) || !isValidPhone(phone)) {
  console.log(' Invalid email or phone format.');
  process.exit();
}

try {
  await pool.query(
    'UPDATE contacts SET name=$1, email=$2, phone=$3, address=$4 WHERE id=$5',
    [name, email, phone, address, id]
  );
  console.log(' Contact updated!');
} catch (err) {
  console.error(' Error:', err.message);
}
