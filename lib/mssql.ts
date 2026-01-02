// website/lib/mssql.ts
import sql from "mssql"

const getEnv = (key: string, fallback = "") => (process.env[key] ?? fallback).toString().trim()

function required(name: string) {
	const v = getEnv(name)
	if (!v) throw new Error(`Missing ENV: ${name} (Vercel -> Settings -> Environment Variables)`)
	return v
}

function buildConfig(): sql.config {
	const server = required("MSSQL_SERVER")
	const database = required("MSSQL_DATABASE")
	const user = required("MSSQL_USER")
	const password = required("MSSQL_PASSWORD")

	const portRaw = getEnv("MSSQL_PORT", getEnv("DB_PORT", "1433"))
	const port = Number(portRaw || "1433")

	return {
		user,
		password,
		server,
		database,
		port: Number.isFinite(port) ? port : 1433,
		options: {
			encrypt: getEnv("MSSQL_ENCRYPT", "true").toLowerCase() === "true",
			trustServerCertificate: getEnv("MSSQL_TRUST_SERVER_CERT", "true").toLowerCase() !== "false",
		},
		pool: {
			max: Number(getEnv("DB_POOL_MAX", "5")),
			min: Number(getEnv("DB_POOL_MIN", "0")),
			idleTimeoutMillis: Number(getEnv("DB_POOL_IDLE", "30000")),
		},
		connectionTimeout: Number(getEnv("DB_CONN_TIMEOUT", "30000")),
		requestTimeout: Number(getEnv("DB_REQ_TIMEOUT", "30000")),
	}
}

declare global {
	var __mssqlPoolPromise: Promise<sql.ConnectionPool> | undefined
}

/**
 * ✅ Lazy pool: Build sırasında import edilse bile bağlanmaz.
 * İlk DB ihtiyacında connect olur.
 */
export function getPool() {
	if (!global.__mssqlPoolPromise) {
		const config = buildConfig()
		global.__mssqlPoolPromise = new sql.ConnectionPool(config)
			.connect()
			.then((pool) => {
				console.log("MSSQL bağlantısı başarılı")
				return pool
			})
			.catch((err: unknown) => {
				console.error("Veritabanı bağlantı hatası:", err)
				global.__mssqlPoolPromise = undefined
				throw err
			})
	}

	return global.__mssqlPoolPromise
}

export default sql
