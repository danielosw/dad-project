import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '$env/dynamic/private';
const ssl = {
	rejectUnauthorized: true, // You can safely set this to true once the cert loads
	ca: env.DIGITAL_OCEAN_CERT?.replace(/\\n/g, '\n'),
};

const pool = new Pool({
	connectionString: env.DATABASE_URL,
	ssl: ssl,
});

export const db = drizzle({ client: pool });