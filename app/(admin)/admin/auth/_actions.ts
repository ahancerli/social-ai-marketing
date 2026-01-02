"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_COOKIE = "admin_session"

function safeNext(next: string | null) {
	if (!next) return "/admin"
	// sadece admin içine redirect izni
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
			maxAge: 60 * 60 * 8, // 8 saat
		})

		redirect(next)
	}

	redirect(`/admin/auth/login?error=1&next=${encodeURIComponent(next)}`)
}

export async function registerAction(_: FormData) {
	// Demo: kayıt işlemi şimdilik kapalı / simülasyon
	redirect("/admin/auth/login?registered=1")
}

export async function forgotPasswordAction(_: FormData) {
	// Demo: mail gönderildi simülasyonu
	redirect("/admin/auth/login?reset=1")
}
