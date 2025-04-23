import inquirer from 'inquirer';
import { createTables } from './db/db.mjs';
import { exec } from 'child_process';
import util from 'util';

const execProm = util.promisify(exec);

async function mainMenu() {
  await createTables();

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose an action using your arrow keys:',
      choices: [
        'Add Contact',
        'List Contacts',
        'Search Contact',
        'Edit Contact',
        'Delete Contact',
        'Group Management',
        'Exit'
      ],
    },
  ]);

  switch (action) {
    case 'Add Contact':
      await execProm('node commands/add.mjs');
      break;
    case 'List Contacts':
      await execProm('node commands/list.mjs');
      break;
    case 'Search Contact':
      await execProm('node commands/search.mjs');
      break;
    case 'Edit Contact':
      await execProm('node commands/edit.mjs');
      break;
    case 'Delete Contact':
      await execProm('node commands/delete.mjs');
      break;
    case 'Group Management':
      await execProm('node commands/group.mjs');
      break;
    case 'Exit':
      console.log('Goodbye thanks for using penn jays cli !');
      process.exit();
  }

  mainMenu(); 
}

mainMenu();
