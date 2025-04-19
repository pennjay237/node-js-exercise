import inquirer from 'inquirer';
import db from '../db.mjs';

const addContact = async () => {
  const { name, email, phone, address } = await inquirer.prompt([
    { name: 'name', message: 'Name:' },
    { name: 'email', message: 'Email:' },
    { name: 'phone', message: 'Phone (start with 2376):' },
    { name: 'address', message: 'Address:' },
  ]);

  // Validation
  if (!/^2376\d{8}$/.test(phone)) {
    console.log(' Phone must start with 2376 and have 12 digits');
    return;
  }
  if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    console.log(' Invalid email format');
    return;
  }

  await db.query(
    'INSERT INTO contacts (name, email, phone, address) VALUES ($1, $2, $3, $4)',
    [name, email, phone, address]
  );

  console.log('Contact added successfully');
};

addContact();
