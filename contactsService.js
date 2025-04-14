
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const db = require('./db');
const chalk = require('chalk');

// Add contact
async function add({ name, phone, email }) {
  const res = await db.query(
    'INSERT INTO contacts (name, phone, email) VALUES (1, 2, 3) RETURNING *',
    [name, phone, email]
  );
  console.log(chalk.green(`Added: ${res.rows[0].name}`));
}

// List contacts
async function list() {
  const res = await db.query('SELECT * FROM contacts');
  res.rows.forEach(c => {
    console.log(`${chalk.yellow(c.id)}. ${c.name} - 📞 ${c.phone} - 📧 ${c.email}`);
  });
}

// Find contact by name
async function find({ name }) {
  const res = await db.query('SELECT * FROM contacts WHERE name ILIKE $1', [`%${name}%`]);
  if (res.rows.length === 0) return console.log(chalk.red('No contacts found.'));
  res.rows.forEach(c => {
    console.log(`${chalk.yellow(c.id)}. ${c.name} - 📞 ${c.phone} - 📧 ${c.email}`);
  });
}

// Delete contact by ID
async function remove({ id }) {
  await db.query('DELETE FROM contacts WHERE id = $1', [id]);
  console.log(chalk.red(`Deleted contact with ID ${id}`));
}

// Yargs setup
yargs(hideBin(process.argv))
  .command('add', 'Add a contact', y => {
    return y
      .option('name', { type: 'string', demandOption: true })
      .option('phone', { type: 'string', demandOption: true })
      .option('email', { type: 'string' });
  }, add)

  .command('list', 'List all contacts', {}, list)

  .command('find', 'Find a contact by name', y => {
    return y.option('name', { type: 'string', demandOption: true });
  }, find)

  .command('delete', 'Delete a contact by ID', y => {
    return y.option('id', { type: 'number', demandOption: true });
  }, remove)

  .demandCommand()
  .help()
  .argv;