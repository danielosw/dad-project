import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
const ssl = (process.env.NODE_ENV === 'production') ? {
	rejectUnauthorized: true,
	ca: process.env.DIGITAL_OCEAN_CERT,
} : {
	rejectUnauthorized: true,
};
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: ssl,
});

export const db = drizzle(pool);