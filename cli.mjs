// cli.mjs
import inquirer from 'inquirer';
import { createTables } from './db/db.mjs';
import { spawn } from 'child_process';

async function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [scriptPath], { stdio: 'inherit' });

    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Script exited with code ${code}`));
    });
  });
}

async function mainMenu() {
  await createTables();

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
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'Add Contact':
      await runScript('./commands/add.mjs');
      break;
    case 'List Contacts':
      await runScript('./commands/list.mjs');
      break;
    case 'Search Contact':
      await runScript('./commands/search.mjs');
      break;
    case 'Edit Contact':
      await runScript('./commands/edit.mjs');
      break;
    case 'Delete Contact':
      await runScript('./commands/delete.mjs');
      break;
    case 'Exit':
      console.log('👋 Goodbye!');
      process.exit();
  }

  await mainMenu();
}

mainMenu();
