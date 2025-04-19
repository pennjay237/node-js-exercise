#!/usr/bin/env node
import inquirer from 'inquirer';
import { exec } from 'child_process';
import { promisify } from 'util';

const run = promisify(exec);

const menu = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: '✔ Choose an action:',
    choices: [
      'Add Contact',
      'List Contacts',
      'Search Contact',
      'Edit Contact',
      'Delete Contact',
      'View Groups',
      'Exit',
    ],
  });

  const cmdMap = {
    'Add Contact': 'add',
    'List Contacts': 'list',
    'Search Contact': 'search',
    'Edit Contact': 'edit',
    'Delete Contact': 'delete',
    'View Groups': 'groups',
  };

  if (action === 'Exit') {
    console.log(' Exiting...');
    process.exit();
  }

  try {
    const commandPath = `commands/${cmdMap[action]}.mjs`;
    const { stdout } = await run(`node ${commandPath}`);
    console.log(stdout);
  } catch (err) {
    console.error(' Error running command:', err.message);
  }

  menu(); // loop back
};

menu();
