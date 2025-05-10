import inquirer from 'inquirer';
import { pool } from '../db/db.mjs';

async function manageGroups() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Group Management:',
      choices: ['Create Group', 'Assign Contact to Group', 'View Groups'],
    },
  ]);

  if (action === 'Create Group') {
    const { groupName } = await inquirer.prompt([{ name: 'groupName', message: 'Enter group name:' }]);
    await pool.query('INSERT INTO groups(name) VALUES($1)', [groupName]);
    console.log('Group created.');
  } else if (action === 'Assign Contact to Group') {
    const { contactId, groupId } = await inquirer.prompt([
      { name: 'contactId', message: 'Enter Contact ID:' },
      { name: 'groupId', message: 'Enter Group ID:' },
    ]);
    await pool.query('INSERT INTO contact_groups(contact_id, group_id) VALUES($1, $2)', [contactId, groupId]);
    console.log('Contact assigned to group.');
  } else {
    const res = await pool.query(`
      SELECT c.name as contact, g.name as group 
      FROM contact_groups cg 
      JOIN contacts c ON cg.contact_id = c.id 
      JOIN groups g ON cg.group_id = g.id`);
    console.table(res.rows);
  }
}

manageGroups();
