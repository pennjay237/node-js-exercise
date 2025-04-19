import pool from '../db.mjs';
import consoleTable from 'console.table';

try {
  const { rows } = await pool.query(
    'SELECT LEFT(name, 1) AS group_letter, COUNT(*) AS total FROM contacts GROUP BY group_letter ORDER BY group_letter'
  );
  console.table(rows);
} catch (err) {
  console.error(' Error fetching groups:', err.message);
}
