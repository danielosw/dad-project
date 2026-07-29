import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const databaseUrl = new URL(process.env.DATABASE_URL);

const ssl = {
	rejectUnauthorized: true, // You can safely set this to true once the cert loads
	ca: process.env.DATABASE_CERT?.replace(/\\n/g, '\n'),
};
export default defineConfig({
	schema: ["./src/lib/server/db/schema.ts"],
	dialect: "postgresql",

	dbCredentials: {
		host: databaseUrl.hostname,
		port: Number(databaseUrl.port || '5432'),
		user: decodeURIComponent(databaseUrl.username),
		password: decodeURIComponent(databaseUrl.password),
		database: databaseUrl.pathname.replace(/^\//, ''),
		ssl: ssl
	},
	verbose: true,
	strict: false,
	breakpoints: false,

});
