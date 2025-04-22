
import { pool } from '../db/db.mjs';

async function groupByLocation() {
  try {
    const res = await pool.query(`
      SELECT address, COUNT(*) as total
      FROM contacts
      GROUP BY address
      ORDER BY total DESC
    `);
    console.table(res.rows);
  } catch (err) {
    console.error(' Error grouping contacts:', err.message);
  }
}

groupByLocation();
