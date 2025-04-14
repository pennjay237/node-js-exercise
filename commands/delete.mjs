import { client } from '../db.mjs';

export default async function deleteContact(options) {
  const res = await client.query('DELETE FROM contacts WHERE id = $1 RETURNING *', [options.id]);
  if (res.rows.length === 0) return console.log('Contact not found.');
  console.log('Deleted Contact:');
  console.table(res.rows);
}
