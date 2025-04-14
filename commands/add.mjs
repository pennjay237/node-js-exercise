import { pool } from '../db.mjs';
import chalk from 'chalk';

export async function addContact(options) {
  const { name, phone, email, address } = options;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query(
      'INSERT INTO contacts(name) VALUES($1) RETURNING id',
      [name]
    );
    const contactId = rows[0].id;

    if (phone) await client.query('INSERT INTO phones(contact_id, phone) VALUES($1, $2)', [contactId, phone]);
    if (email) await client.query('INSERT INTO emails(contact_id, email) VALUES($1, $2)', [contactId, email]);
    if (address) await client.query('INSERT INTO addresses(contact_id, address) VALUES($1, $2)', [contactId, address]);

    await client.query('COMMIT');
    console.log(chalk.green('Contact added successfully!'));
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(chalk.red('Failed to add contact:'), err.message);
  } finally {
    client.release();
  }
}

