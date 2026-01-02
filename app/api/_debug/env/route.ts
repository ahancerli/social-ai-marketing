import { NextResponse } from "next/server"

export async function GET() {
	return NextResponse.json({
		MSSQL_SERVER: process.env.MSSQL_SERVER ? "set" : "missing",
		MSSQL_DATABASE: process.env.MSSQL_DATABASE ? "set" : "missing",
		MSSQL_USER: process.env.MSSQL_USER ? "set" : "missing",
		MSSQL_PASSWORD: process.env.MSSQL_PASSWORD ? "set" : "missing",
	})
}
