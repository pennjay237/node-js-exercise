import client from '../db.mjs';
import chalk from 'chalk';
import { isValidEmail, isValidPhone } from '../utils/validators.mjs'; // Assuming you have these helpers

export default async function addContact(options) {
  const { name, phone, email, address, group } = options;

  // Validate email
  if (!isValidEmail(email)) {
    console.log("Invalid email format.");
    return;
  }

  // Validate phone number
  if (!isValidPhone(phone)) {
    console.log("Invalid phone number. It should start with 2376 and have 8 digits.");
    return;
  }

  try {
    // Check if phone number already exists
    const phoneCheck = await client.query('SELECT * FROM contacts WHERE phone = $1', [phone]);
    if (phoneCheck.rows.length > 0) {
      console.log("Phone number already exists.");
      return;
    }

    // Check if email already exists
    const emailCheck = await client.query('SELECT * FROM contacts WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      console.log("Email already exists.");
      return;
    }

    // Insert new contact
    const result = await client.query(
      'INSERT INTO contacts (name, phone, email, address, group_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, phone, email, address, group]
    );

    console.log(chalk.green('Contact added!'));
    console.table(result.rows);
  } catch (error) {
    console.error(chalk.red('Error adding contact:'), error.message);
  }
}