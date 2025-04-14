import { client } from '../db.mjs';

export default async function listContacts() {
  const res = await client.query('SELECT * FROM contacts ORDER BY id');
  console.table(res.rows);
}
