// Add contact
async function add({ name, phone, email }) {
    const res = await db.query(
      'INSERT INTO contacts (name, phone, email) VALUES (1, 2, 3) RETURNING *',
      [name, phone, email]
    );
    console.log(chalk.green(`Added: ${res.rows[0].name}`));
  }
  