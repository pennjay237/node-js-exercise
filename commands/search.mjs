import { pool } from '../db.mjs';

export async function searchContact({ name }) {
  const res = await pool.query(`
    SELECT c.id, c.name, p.phone, e.email
    FROM contacts c
    LEFT JOIN phones p ON c.id = p.contact_id
    LEFT JOIN emails e ON c.id = e.contact_id
    WHERE c.name ILIKE $1
  `, [`%${name}%`]);

  console.table(res.rows);
}




