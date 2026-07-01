import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const certPath = path.resolve(process.cwd(), 'certs/digitalocean-ca.crt');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: true,
		ca: [fs.readFileSync(certPath).toString()] | [process.env.DATABASE_SSL_CERT],
	},
});

export const db = drizzle(pool);