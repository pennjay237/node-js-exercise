import { client } from '../db.mjs';

export default async function updateContact(options) {
  const { id, name, phone, email, address, group } = options;

  const old = await client.query('SELECT * FROM contacts WHERE id = $1', [id]);
  if (old.rows.length === 0) return console.log('Contact not found.');

  const contact = old.rows[0];

  const result = await client.query(
    `UPDATE contacts SET name = $1, phone = $2, email = $3, address = $4, group_name = $5 WHERE id = $6 RETURNING *`,
    [
      name || contact.name,
      phone || contact.phone,
      email || contact.email,
      address || contact.address,
      group || contact.group_name,
      id
    ]
  );

  console.log('Updated Contact:');
  console.table(result.rows);
}
