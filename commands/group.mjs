import { client } from '../db.mjs';

export default async function assignGroup(options) {
  const { id, group } = options;

  const result = await client.query(
    'UPDATE contacts SET group_name = $1 WHERE id = $2 RETURNING *',
    [group, id]
  );

  console.log('Group updated:');
  console.table(result.rows);
}
