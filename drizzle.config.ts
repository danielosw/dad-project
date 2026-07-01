import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const databaseUrl = new URL(process.env.DATABASE_URL);
const caPath = path.resolve('certs/digitalocean-ca.crt');

export default defineConfig({
	schema: "./src/lib/server/db/schema.ts",
	dialect: "postgresql",

	dbCredentials: {
		host: databaseUrl.hostname,
		port: Number(databaseUrl.port || '5432'),
		user: decodeURIComponent(databaseUrl.username),
		password: decodeURIComponent(databaseUrl.password),
		database: databaseUrl.pathname.replace(/^\//, ''),
		ssl: {
			ca: [fs.readFileSync(caPath, 'utf8')],
			rejectUnauthorized: true
		}
	},
	verbose: true,
	strict: false,
	breakpoints: false,

});
