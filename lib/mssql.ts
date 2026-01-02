// website/lib/mssql.ts
import sql from "mssql"

const config: sql.config = {
	user: "u9105298_userSoc",
	password: "r:VcO468ekLJ--@3",
	server: "94.73.170.10",
	database: "u9105298_social",
	options: {
		encrypt: true,
		trustServerCertificate: true,
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
