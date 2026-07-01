import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/node-postgres';
import fs from 'fs';
import path from 'path';

const certPath = path.resolve(process.cwd(), 'certs/digitalocean-ca.crt');

if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

export const db = drizzle({
	connection: {
		connectionString: DATABASE_URL,
		ssl: {
			rejectUnauthorized: true,
			ca: [fs.readFileSync(certPath).toString()],
		},
	},
});