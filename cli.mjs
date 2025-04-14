import { Command } from 'commander';
import chalk from 'chalk';

import { addContact } from './commands/add.mjs';
import { listContacts } from './commands/list.mjs';
import { searchContact } from './commands/search.mjs';
import { updateContact } from './commands/update.mjs';
import { deleteContact } from './commands/delete.mjs';
import { addToGroup } from './commands/group.mjs';

const program = new Command();

program
  .name('contacts')
  .description('CLI to manage personal contacts')
  .version('1.0.0');

program
  .command('add')
  .description('Add a new contact')
  .requiredOption('--name <name>')
  .option('--phone <phone>')
  .option('--email <email>')
  .option('--address <address>')
  .action(addContact);

program
  .command('list')
  .description('List all contacts')
  .action(listContacts);

program
  .command('search')
  .description('Search contacts by name')
  .requiredOption('--name <name>')
  .action(searchContact);

program
  .command('update')
  .description('Update contact')
  .requiredOption('--id <id>')
  .option('--name <name>')
  .option('--phone <phone>')
  .option('--email <email>')
  .option('--address <address>')
  .action(updateContact);

program
  .command('delete')
  .description('Delete contact')
  .requiredOption('--id <id>')
  .action(deleteContact);

program
  .command('group')
  .description('Add contact to group')
  .requiredOption('--id <contactId>')
  .requiredOption('--group <groupName>')
  .action(addToGroup);

program.parse();