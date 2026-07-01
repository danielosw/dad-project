import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
let certPath: string = "";
if (process.env.NODE_ENV === 'production') {
	certPath = path.resolve(process.cwd(), 'certs/digitalocean-ca.crt');
}
const ssl = (process.env.NODE_ENV === 'production') ? {
	rejectUnauthorized: true,
	ca: [fs.readFileSync(certPath).toString()]
} : {
	rejectUnauthorized: true,
};
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: ssl,
});

export const db = drizzle(pool);