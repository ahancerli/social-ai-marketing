"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import sql, { poolPromise } from "@/lib/mssql"
import { Users } from "@/app/api/customer/type"

const ADMIN_COOKIE = "admin_session"
const ADMIN_CUSTOMER_COOKIE = "admin_customer" // müşteri bilgisi için
const SESSION_TTL_SECONDS = 60 * 60 * 8 // 8 saat

function safeNext(next: string | null) {
	if (!next) return "/admin"
	if (next.startsWith("/admin")) return next
	return "/admin"
}

function isEmailFormat(v: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim().toLowerCase())
}

function sign(payload: string, secret: string) {
	return crypto.createHmac("sha256", secret).update(payload).digest("hex")
}

function makeSessionToken(userId: number, secret: string) {
	const now = Math.floor(Date.now() / 1000)
	const exp = now + SESSION_TTL_SECONDS
	const base = `${userId}.${exp}`
	const sig = sign(base, secret)
	return `${base}.${sig}`
}

function encodeCustomerInfo(obj: unknown, secret: string) {
	// küçük bir payload tut: UI için
	const json = JSON.stringify(obj)
	const b64 = Buffer.from(json, "utf8").toString("base64url")
	const sig = sign(b64, secret)
	return `${b64}.${sig}`
}

function randomCustomerNumber() {
	const n = Math.floor(Math.random() * 100000000) + 1
	return `WEB-${n}`
}

export async function loginAction(formData: FormData) {
	const identifier = String(formData.get("username") ?? "").trim() // FE'de input name="username" idi; onu identifier gibi kullanıyoruz
	const password = String(formData.get("password") ?? "")
	const next = safeNext(formData.get("next") ? String(formData.get("next")) : null)

	// 2) Customer login (getCustomer üzerinden arama)
	if (!identifier || !password) {
		redirect(`/admin/auth/login?error=1&next=${encodeURIComponent(next)}`)
	}

	//base url belirtirken direk hangi linkte ise ona göre alsın
	const baseUrl = process.env.BASE_URL || "http://localhost:3000"

	const byEmail = isEmailFormat(identifier)

	const getCustomerPayload: Users = {
		user_type_id: 3,
		status: true,
	}

	if (byEmail) getCustomerPayload.email = identifier.toLowerCase()
	else getCustomerPayload.username = identifier

	// getCustomer çağrısı
	const res = await fetch(`${baseUrl}/api/customer/getCustomer`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(getCustomerPayload),
		cache: "no-store",
	})

	if (!res.ok) {
		redirect(`/admin/auth/login?error=1&next=${encodeURIComponent(next)}`)
	}

	const data = await res.json()
	const customer = data?.customers?.[0]

	// müşteri yoksa
	if (!customer?.user_id) {
		redirect(`/admin/auth/login?error=1&next=${encodeURIComponent(next)}`)
	}

	const pool = await poolPromise
	const passResult = await pool.request().input("user_id", sql.BigInt, customer.user_id).query(`
      SELECT TOP 1 [password]
      FROM app.users
      WHERE user_id = @user_id
    `)

	const passwordHash = String(passResult.recordset?.[0]?.password ?? "")
	if (!passwordHash) {
		redirect(`/admin/auth/login?error=1&next=${encodeURIComponent(next)}`)
	}

	const match = await bcrypt.compare(password, passwordHash)
	if (!match) {
		redirect(`/admin/auth/login?error=1&next=${encodeURIComponent(next)}`)
	}

	// ✅ Session cookie set + müşteri bilgisi cookie set
	const secret = process.env.ADMIN_SESSION_SECRET || "dev-secret"
	const token = makeSessionToken(Number(customer.user_id), secret)
	const customerInfoToken = encodeCustomerInfo(
		{
			user_id: customer.user_id,
			email: customer.email,
			username: customer.username,
			display_name: customer.display_name,
			customer_number: customer.customer_number,
			user_type_id: customer.user_type_id,
		},
		secret,
	)

	const c = await cookies()

	c.set(ADMIN_COOKIE, token, {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		secure: process.env.NODE_ENV === "production",
		maxAge: SESSION_TTL_SECONDS,
	})

	// UI'da lazım olursa diye (istersen tamamen kaldırabiliriz)
	c.set(ADMIN_CUSTOMER_COOKIE, customerInfoToken, {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		secure: process.env.NODE_ENV === "production",
		maxAge: SESSION_TTL_SECONDS,
	})

	redirect(next)
}

export async function registerAction(formData: FormData) {
	const email = String(formData.get("email") ?? "").trim()
	const phone = String(formData.get("phone") ?? "").trim()
	const display_name = String(formData.get("display_name") ?? "").trim()
	const username = String(formData.get("username") ?? "").trim()
	const password = String(formData.get("password") ?? "")

	if (!email || !phone || !display_name || !username || !password) {
		redirect("/admin/auth/register?error=1")
	}

	const payload = {
		user_type_id: 1,
		status: true,
		email,
		phone,
		display_name,
		username,
		password,
		customer_number: randomCustomerNumber(),
	}

	const baseUrl =
		process.env.NEXT_PUBLIC_BASE_URL ||
		(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

	const res = await fetch(`${baseUrl}/api/customer/createCustomer`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
		cache: "no-store",
	})

	if (!res.ok) {
		redirect(`/admin/auth/register?error=1&code=${res.status}`)
	}

	redirect("/admin/auth/login?registered=1")
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function forgotPasswordAction(_: FormData) {
	redirect("/admin/auth/login?reset=1")
}
