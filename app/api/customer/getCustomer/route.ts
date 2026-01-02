import { NextRequest, NextResponse } from "next/server"
import sql, { poolPromise } from "@/lib/mssql"

export const runtime = "nodejs"

type GetCustomerRequest = {
	user_type_id?: number | string
	status?: boolean
	email?: string
	username?: string
	customer_number?: string
}

function firstError(message: string, field?: string) {
	return NextResponse.json({ ok: false, error: message, field }, { status: 400 })
}

function safeInt(v: unknown) {
	if (v === undefined || v === null) return undefined
	const n = typeof v === "string" ? Number(v) : (v as number)
	return Number.isInteger(n) ? n : NaN
}

function isNonEmptyString(v: unknown): v is string {
	return typeof v === "string" && v.trim().length > 0
}

function normalizeEmail(email: string) {
	return email.trim().toLowerCase()
}

export async function POST(req: NextRequest) {
	let body: GetCustomerRequest

	try {
		body = (await req.json()) as GetCustomerRequest
	} catch {
		return firstError("Invalid JSON body")
	}

	// optional fields
	const userTypeId = body.user_type_id !== undefined ? safeInt(body.user_type_id) : undefined
	const status = body.status

	const email = isNonEmptyString(body.email) ? normalizeEmail(body.email) : undefined
	const username = isNonEmptyString(body.username) ? body.username.trim() : undefined
	const customer_number = isNonEmptyString(body.customer_number)
		? body.customer_number.trim()
		: undefined

	if (userTypeId !== undefined && !Number.isFinite(userTypeId)) {
		return firstError("user_type_id must be a valid integer", "user_type_id")
	}
	if (status !== undefined && typeof status !== "boolean") {
		return firstError("status must be boolean", "status")
	}

	// en az 1 filtre zorunlu
	const hasAnyFilter =
		userTypeId !== undefined ||
		status !== undefined ||
		email !== undefined ||
		username !== undefined ||
		customer_number !== undefined

	if (!hasAnyFilter) {
		return firstError("At least one filter must be provided", "filters")
	}

	try {
		const pool = await poolPromise

		// Dinamik WHERE
		const where: string[] = []
		const request = pool.request()

		if (userTypeId !== undefined) {
			where.push("user_type_id = @user_type_id")
			request.input("user_type_id", sql.Int, userTypeId)
		}

		if (status !== undefined) {
			where.push("status = @status")
			request.input("status", sql.Bit, status)
		}

		if (email !== undefined) {
			where.push("email = @email")
			request.input("email", sql.NVarChar(320), email)
		}

		if (username !== undefined) {
			where.push("username = @username")
			request.input("username", sql.NVarChar(64), username)
		}

		if (customer_number !== undefined) {
			where.push("customer_number = @customer_number")
			request.input("customer_number", sql.NVarChar(64), customer_number)
		}

		const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : ""

		const result = await request.query(`
      SELECT
        user_id,
        user_type_id,
        status,
        email,
        phone,
        display_name,
        username,
        created_at,
        updated_at,
        meta_json,
        customer_number
      FROM app.users
      ${whereSql}
      ORDER BY user_id DESC
    `)

		return NextResponse.json(
			{
				ok: true,
				count: result.recordset.length,
				customers: result.recordset,
				filters_applied: {
					user_type_id: userTypeId ?? null,
					status: status ?? null,
					email: email ?? null,
					username: username ?? null,
					customer_number: customer_number ?? null,
				},
			},
			{ status: 200 },
		)
	} catch (err: unknown) {
		console.error("getCustomer error:", err)
		return NextResponse.json({ ok: false, error: "Database error" }, { status: 500 })
	}
}
