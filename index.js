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