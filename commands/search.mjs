import { client } from '../db.mjs';

export default async function searchContact(options) {
  const res = await client.query(
    'SELECT * FROM contacts WHERE name ILIKE $1',
    [`%${options.name}%`]
  );
  console.table(res.rows);
}
