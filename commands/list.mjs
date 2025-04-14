// List contacts
async function list() {
    const res = await db.query('SELECT * FROM contacts');
    res.rows.forEach(c => {
      console.log(`${chalk.yellow(c.id)}. ${c.name} - 📞 ${c.phone} - 📧 ${c.email}`);
    });
  }