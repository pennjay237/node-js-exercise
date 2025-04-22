import inquirer from 'inquirer';
import { createTable } from './db/db.mjs';
import { exec } from 'child_process';
import util from 'util';

const execProm = util.promisify(exec);

async function mainMenu() {
  await createTable();

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose an action:',
      choices: [
        'Add Contact',
        'List Contacts',
        'Search Contact',
        'Edit Contact',
        'Delete Contact',
        'Group Contacts',
        'Exit',
      ],
    },
  ]);

  const commandMap = {
    'Add Contact': 'add',
    'List Contacts': 'list',
    'Search Contact': 'search',
    'Edit Contact': 'edit',
    'Delete Contact': 'delete',
    'Group Contact': 'group'
  };

  if (action === 'Exit') {
    console.log(' Goodbye!');
    process.exit();
  }

  const cmd = `node commands/${commandMap[action]}.mjs`;
  await execProm(cmd);

  mainMenu(); // Return to menu
}

mainMenu();
