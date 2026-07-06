import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DIGITAL_OCEAN_CERT, DATABASE_URL } from '$env/static/private';
const ssl = {
	rejectUnauthorized: true, // You can safely set this to true once the cert loads
	ca: DIGITAL_OCEAN_CERT?.replace(/\\n/g, '\n'),
};

const pool = new Pool({
	connectionString: DATABASE_URL,
	ssl: ssl,
});

export const db = drizzle({ client: pool });