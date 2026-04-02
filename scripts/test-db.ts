import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

async function test() {
  const result = await sql`SELECT 1 as connection_test`;
  console.log(result);
  process.exit(0);
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
