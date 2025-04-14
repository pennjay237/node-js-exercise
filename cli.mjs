import { Command } from 'commander';
// import chalk from 'chalk';

import AddContact from './commands/add.mjs';
import ListContacts from './commands/list.mjs';
import SearchContact from './commands/search.mjs';
import UpdateContact from './commands/update.mjs';
import DeleteContact from './commands/delete.mjs';
import AddToGroup from './commands/group.mjs';

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
  .action(AddContact);

program
  .command('list')
  .description('List all contacts')
  .action(ListContacts);

program
  .command('search')
  .description('Search contacts by name')
  .requiredOption('--name <name>')
  .action(SearchContact);

program
  .command('update')
  .description('Update contact')
  .requiredOption('--id <id>')
  .option('--name <name>')
  .option('--phone <phone>')
  .option('--email <email>')
  .option('--address <address>')
  .action(UpdateContact);

program
  .command('delete')
  .description('Delete contact')
  .requiredOption('--id <id>')
  .action(DeleteContact);

program
  .command('group')
  .description('Add contact to group')
  .requiredOption('--id <contactId>')
  .requiredOption('--group <groupName>')
  .action(AddToGroup);

program.parse();