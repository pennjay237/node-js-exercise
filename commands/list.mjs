import { pool } from '../db.mjs';
import chalk from 'chalk';

export async function listContacts() {
  const res = await pool.query(`
    SELECT c.id, c.name, 
      COALESCE(p.phone, '—') AS phone, 
      COALESCE(e.email, '—') AS email, 
      COALESCE(a.address, '—') AS address
    FROM contacts c
    LEFT JOIN phones p ON c.id = p.contact_id
    LEFT JOIN emails e ON c.id = e.contact_id
    LEFT JOIN addresses a ON c.id = a.contact_id
    ORDER BY c.id
  `);

  console.table(res.rows);
}