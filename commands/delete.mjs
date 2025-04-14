//Delete contact by ID
async function remove({ id }) {
  await db.query('DELETE FROM contacts WHERE id = $1', [id]);
  console.log(chalk.red(`Deleted contact with ID ${id}`));
}
