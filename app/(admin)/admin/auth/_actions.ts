"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_COOKIE = "admin_session"

function safeNext(next: string | null) {
	if (!next) return "/admin"
	if (next.startsWith("/admin")) return next
	return "/admin"
}

export async function loginAction(formData: FormData) {
	const username = String(formData.get("username") ?? "")
	const password = String(formData.get("password") ?? "")
	const next = safeNext(formData.get("next") ? String(formData.get("next")) : null)

	if (username === "admin" && password === "admin") {
		;(await cookies()).set(ADMIN_COOKIE, "1", {
			httpOnly: true,
			sameSite: "lax",
			path: "/",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 8,
		})
		redirect(next)
	}

	redirect(`/admin/auth/login?error=1&next=${encodeURIComponent(next)}`)
}

function randomCustomerNumber() {
	const n = Math.floor(Math.random() * 100000000) + 1 // 1..100000000
	return `WEB-${n}`
}

export async function registerAction(formData: FormData) {
	const email = String(formData.get("email") ?? "").trim()
	const phone = String(formData.get("phone") ?? "").trim()
	const display_name = String(formData.get("display_name") ?? "").trim()
	const username = String(formData.get("username") ?? "").trim()

	if (!email || !phone || !display_name || !username) {
		redirect("/admin/auth/register?error=1")
	}

	const payload = {
		user_type_id: 1,
		status: true,
		email,
		phone,
		display_name,
		username,
		customer_number: randomCustomerNumber(),
	}

	// ✅ Aynı proje içinde API çağrısı (absolute URL gerekir)
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
		// 409 gibi durumlarda register ekranına mesajla dön
		redirect(`/admin/auth/register?error=1&code=${res.status}`)
	}

	redirect("/admin/auth/login?registered=1")
}

export async function forgotPasswordAction(_: FormData) {
	redirect("/admin/auth/login?reset=1")
}
