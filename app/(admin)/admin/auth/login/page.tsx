import Link from "next/link"
import { Lock, User } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { loginAction } from "../_actions"

export const metadata = {
	title: "Admin | Login",
}

type SP = {
	error?: string | string[]
	next?: string | string[]
	registered?: string | string[]
	reset?: string | string[]
}

function first(v: string | string[] | undefined) {
	return Array.isArray(v) ? v[0] : v
}

function safeNext(v: string | string[] | undefined) {
	const n = first(v)
	if (!n) return "/admin"

	// open redirect engeli: sadece /admin altına izin ver
	if (n.startsWith("/admin")) return n

	return "/admin"
}

export default async function AdminLoginPage({
	searchParams,
}: {
	// Next.js 15+ => searchParams Promise gelir
	searchParams: Promise<SP>
}) {
	const sp = (await searchParams) ?? {}

	const next = safeNext(sp.next)
	const error = first(sp.error) === "1"
	const registered = first(sp.registered) === "1"
	const reset = first(sp.reset) === "1"

	return (
		<Card className="rounded-2xl border-white/10 bg-white/5 backdrop-blur">
			<CardHeader className="space-y-1">
				<CardTitle className="text-white text-2xl font-extrabold">Admin Girişi</CardTitle>
				<p className="text-sm text-white/70">Paneli yönetmek için giriş yap.</p>
			</CardHeader>

			<CardContent className="space-y-4">
				{error && (
					<div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
						Hatalı kullanıcı adı veya şifre.
					</div>
				)}

				{registered && (
					<div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
						Kayıt tamamlandı (demo). Şimdi giriş yapabilirsin.
					</div>
				)}

				{reset && (
					<div className="rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-200">
						Şifre sıfırlama isteği alındı (demo).
					</div>
				)}

				<form action={loginAction} className="space-y-4">
					{/* loginAction içinde redirect için */}
					<input type="hidden" name="next" value={next} />

					<div className="space-y-2">
						<label className="text-sm text-white/80">Kullanıcı Adı</label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
							<Input
								name="username"
								placeholder="admin"
								className="pl-9 h-11 bg-white/10 border-white/10 text-white placeholder:text-white/40"
								autoComplete="username"
								required
							/>
						</div>
					</div>

					<div className="space-y-2">
						<label className="text-sm text-white/80">Şifre</label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
							<Input
								name="password"
								type="password"
								placeholder="admin"
								className="pl-9 h-11 bg-white/10 border-white/10 text-white placeholder:text-white/40"
								autoComplete="current-password"
								required
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<label className="flex items-center gap-2 text-sm text-white/70 select-none">
							<input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-white/10" />
							Beni hatırla
						</label>

						<Link
							href="/admin/auth/forgot-password"
							className="text-sm text-indigo-200 hover:text-indigo-100 underline-offset-4 hover:underline"
						>
							Şifremi unuttum
						</Link>
					</div>

					<Button className="w-full h-11 bg-white text-slate-900 hover:bg-white/90 font-semibold">
						Giriş Yap
					</Button>
				</form>

				<div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
					Demo giriş bilgisi: <b>admin / admin</b>
				</div>

				<div className="text-sm text-white/70">
					Hesabın yok mu?{" "}
					<Link
						href="/admin/auth/register"
						className="text-indigo-200 hover:text-indigo-100 underline-offset-4 hover:underline"
					>
						Kayıt Ol
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}
