// website/lib/mssql.ts
import sql from "mssql"

const getEnv = (key: string, fallback = "") => (process.env[key] ?? fallback).toString().trim()

const MSSQL_SERVER = getEnv("MSSQL_SERVER")
const MSSQL_DATABASE = getEnv("MSSQL_DATABASE")
const MSSQL_USER = getEnv("MSSQL_USER")
const MSSQL_PASSWORD = getEnv("MSSQL_PASSWORD")

// Port: MSSQL_PORT -> DB_PORT -> 1433
const MSSQL_PORT_RAW = getEnv("MSSQL_PORT", getEnv("DB_PORT", "1433"))
const MSSQL_PORT = Number(MSSQL_PORT_RAW || "1433")

const MSSQL_ENCRYPT = getEnv("MSSQL_ENCRYPT", "true").toLowerCase() === "true"
const MSSQL_TRUST_SERVER_CERT = getEnv("MSSQL_TRUST_SERVER_CERT", "true").toLowerCase() !== "false"

// Pool & timeouts
const DB_POOL_MAX = Number(getEnv("DB_POOL_MAX", "5"))
const DB_POOL_MIN = Number(getEnv("DB_POOL_MIN", "0"))
const DB_POOL_IDLE = Number(getEnv("DB_POOL_IDLE", "30000"))
const DB_CONN_TIMEOUT = Number(getEnv("DB_CONN_TIMEOUT", "30000"))
const DB_REQ_TIMEOUT = Number(getEnv("DB_REQ_TIMEOUT", "30000"))

// ✅ Prod’da boş server ile ":1433" sorunu yaşamamak için fail-fast
function assertRequired(name: string, value: string) {
	if (!value) {
		throw new Error(`Missing ENV: ${name} (Vercel -> Settings -> Environment Variables)`)
	}
}

assertRequired("MSSQL_SERVER", MSSQL_SERVER)
assertRequired("MSSQL_DATABASE", MSSQL_DATABASE)
assertRequired("MSSQL_USER", MSSQL_USER)
assertRequired("MSSQL_PASSWORD", MSSQL_PASSWORD)

const config: sql.config = {
	user: MSSQL_USER,
	password: MSSQL_PASSWORD,
	server: MSSQL_SERVER,
	database: MSSQL_DATABASE,
	port: Number.isFinite(MSSQL_PORT) ? MSSQL_PORT : 1433,
	options: {
		encrypt: MSSQL_ENCRYPT,
		trustServerCertificate: MSSQL_TRUST_SERVER_CERT,
	},
	pool: {
		max: DB_POOL_MAX,
		min: DB_POOL_MIN,
		idleTimeoutMillis: DB_POOL_IDLE,
	},
	connectionTimeout: DB_CONN_TIMEOUT,
	requestTimeout: DB_REQ_TIMEOUT,
}

declare global {
	var __mssqlPoolPromise: Promise<sql.ConnectionPool> | undefined
}

// ✅ Serverless (Vercel) için global cache
export const poolPromise =
	global.__mssqlPoolPromise ??
	(global.__mssqlPoolPromise = new sql.ConnectionPool(config)
		.connect()
		.then((pool) => {
			console.log("MSSQL bağlantısı başarılı")
			return pool
		})
		.catch((err: unknown) => {
			console.error("Veritabanı bağlantı hatası:", err)
			global.__mssqlPoolPromise = undefined
			throw err
		}))

export default sql
