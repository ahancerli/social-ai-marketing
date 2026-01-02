import { NextRequest, NextResponse } from "next/server"
import sql, { poolPromise } from "@/lib/mssql"

export const runtime = "nodejs"

type CreateCustomerRequest = {
	user_type_id: number | string
	status: boolean

	email: string
	phone: string
	display_name: string
	username: string
	customer_number: string
}

function isNonEmptyString(v: unknown): v is string {
	return typeof v === "string" && v.trim().length > 0
}

function firstError(message: string, field?: string) {
	return NextResponse.json({ ok: false, error: message, field }, { status: 400 })
}

function normalizeEmail(email: string) {
	return email.trim().toLowerCase()
}

function safeInt(v: unknown) {
	const n = typeof v === "string" ? Number(v) : (v as number)
	return Number.isInteger(n) ? n : NaN
}

export async function POST(req: NextRequest) {
	let body: CreateCustomerRequest

	try {
		body = (await req.json()) as CreateCustomerRequest
	} catch {
		return firstError("Invalid JSON body")
	}

	const userTypeId = safeInt(body.user_type_id)

	if (!Number.isFinite(userTypeId) || userTypeId <= 0) {
		return firstError("user_type_id is required and must be a positive integer", "user_type_id")
	}

	// ✅ status requestten alınacak
	if (typeof body.status !== "boolean") {
		return firstError("status is required and must be boolean", "status")
	}

	if (!isNonEmptyString(body.email)) return firstError("email is required", "email")
	if (!isNonEmptyString(body.phone)) return firstError("phone is required", "phone")
	if (!isNonEmptyString(body.display_name))
		return firstError("display_name is required", "display_name")
	if (!isNonEmptyString(body.username)) return firstError("username is required", "username")
	if (!isNonEmptyString(body.customer_number))
		return firstError("customer_number is required", "customer_number")

	const email = normalizeEmail(body.email)
	const phone = body.phone.trim()
	const display_name = body.display_name.trim()
	const username = body.username.trim()
	const customer_number = body.customer_number.trim()
	const status = body.status // ✅ artık tanımlı

	if (!email.includes("@") || !email.includes(".")) {
		return firstError("email is not valid", "email")
	}

	try {
		const pool = await poolPromise

		// Çakışma kontrolü: email / username / customer_number
		const existsResult = await pool
			.request()
			.input("email", sql.NVarChar(320), email)
			.input("username", sql.NVarChar(64), username)
			.input("customer_number", sql.NVarChar(64), customer_number).query(`
        SELECT TOP 1 user_id
        FROM app.users
        WHERE email = @email OR username = @username OR customer_number = @customer_number
      `)

		if (existsResult.recordset.length > 0) {
			return NextResponse.json(
				{ ok: false, error: "Customer already exists (email/username/customer_number)" },
				{ status: 409 },
			)
		}

		// INSERT + OUTPUT
		const insertResult = await pool
			.request()
			.input("user_type_id", sql.Int, userTypeId)
			.input("status", sql.Bit, status) // ✅ BIT olarak gönderiyoruz
			.input("email", sql.NVarChar(320), email)
			.input("phone", sql.NVarChar(32), phone)
			.input("display_name", sql.NVarChar(250), display_name)
			.input("username", sql.NVarChar(64), username)
			.input("customer_number", sql.NVarChar(64), customer_number).query(`
        INSERT INTO app.users (
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
        )
        OUTPUT
          INSERTED.user_id,
          INSERTED.user_type_id,
          INSERTED.status,
          INSERTED.email,
          INSERTED.phone,
          INSERTED.display_name,
          INSERTED.username,
          INSERTED.created_at,
          INSERTED.updated_at,
          INSERTED.meta_json,
          INSERTED.customer_number
        VALUES (
          @user_type_id,
          @status,
          @email,
          @phone,
          @display_name,
          @username,
          SYSUTCDATETIME(),
          SYSUTCDATETIME(),
          NULL,
          @customer_number
        )
      `)

		const created = insertResult.recordset?.[0]

		return NextResponse.json({ ok: true, customer: created }, { status: 201 })
	} catch (err: unknown) {
		console.error("createCustomer error:", err)
		return NextResponse.json({ ok: false, error: "Database error" }, { status: 500 })
	}
}
