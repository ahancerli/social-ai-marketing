// website/lib/mssql.ts
import sql from "mssql"

const config: sql.config = {
	user: process.env.MSSQL_USER,
	password: process.env.MSSQL_PASSWORD,
	server: process.env.MSSQL_SERVER || "",
	database: process.env.MSSQL_DATABASE,
	options: {
		encrypt: String(process.env.MSSQL_ENCRYPT).toLowerCase() === "true",
		trustServerCertificate: String(process.env.MSSQL_TRUST_SERVER_CERT).toLowerCase() !== "false",
	},
}

export const poolPromise = new sql.ConnectionPool(config)
	.connect()
	.then((pool) => {
		console.log("MSSQL bağlantısı başarılı")
		return pool
	})
	.catch((err: unknown) => {
		console.error("Veritabanı bağlantı hatası:", err)
		throw err
	})

export default sql
