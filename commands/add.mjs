import inquirer from 'inquirer';
import { pool } from '../db/db.mjs';

export async function addContact() {
  const answers = await inquirer.prompt([
    { name: 'name', message: 'Enter name:' },
    { name: 'email', message: 'Enter email:' },
    { name: 'phone', message: 'Enter phone (starting with 2376):' },
    { name: 'address', message: 'Enter address:' },
  ]);

  // Validate phone
  if (!/^2376\d{8}$/.test(answers.phone)) {
    console.log(' Phone must start with 2376 and be 12 digits');
    return;
  }

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) {
    console.log(' Invalid email format');
    return;
  }

  // Insert into DB
  try {
    await pool.query(
      'INSERT INTO contacts (name, email, phone, address) VALUES ($1, $2, $3, $4)',
      [answers.name, answers.email, answers.phone, answers.address]
    );
    console.log(' Contact added!');
  } catch (err) {
    console.error(' Failed to add contact:', err.message);
  }
}
