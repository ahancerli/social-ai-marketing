import Link from "next/link"
import { Mail, User, Phone } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { registerAction } from "../_actions"

export const metadata = {
	title: "Admin | Register",
}

type SP = {
	error?: string | string[]
	code?: string | string[]
}

function first(v: string | string[] | undefined) {
	return Array.isArray(v) ? v[0] : v
}

export default async function AdminRegisterPage({
	searchParams,
}: {
	// ✅ Next.js 15+ => searchParams Promise gelir
	searchParams: Promise<SP>
}) {
	const sp = (await searchParams) ?? {}

	const error = first(sp.error) === "1"
	const code = first(sp.code)

	return (
		<Card className="rounded-2xl border-white/10 bg-white/5 backdrop-blur">
			<CardHeader className="space-y-1">
				<CardTitle className="text-white text-2xl font-extrabold">Kayıt Ol</CardTitle>
				<p className="text-sm text-white/70">Yeni kullanıcı oluştur. (Customer kaydı oluşturur)</p>
			</CardHeader>

			<CardContent className="space-y-4">
				{error && (
					<div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
						Kayıt başarısız. {code ? `Hata Kodu: ${code}` : ""} <br />
						(Email/username/customer_number çakışmış olabilir.)
					</div>
				)}

				<form action={registerAction} className="space-y-4">
					{/* İsim Soyisim -> display_name */}
					<div className="space-y-2">
						<label className="text-sm text-white/80">İsim Soyisim</label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
							<Input
								name="display_name"
								placeholder="Akman Yılmaz"
								className="pl-9 h-11 bg-white/10 border-white/10 text-white placeholder:text-white/40"
								required
							/>
						</div>
					</div>

					{/* Username */}
					<div className="space-y-2">
						<label className="text-sm text-white/80">Kullanıcı Adı</label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
							<Input
								name="username"
								placeholder="akman"
								className="pl-9 h-11 bg-white/10 border-white/10 text-white placeholder:text-white/40"
								autoComplete="username"
								required
							/>
						</div>
					</div>

					{/* Email */}
					<div className="space-y-2">
						<label className="text-sm text-white/80">Email</label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
							<Input
								name="email"
								type="email"
								placeholder="admin@test.com"
								className="pl-9 h-11 bg-white/10 border-white/10 text-white placeholder:text-white/40"
								autoComplete="email"
								required
							/>
						</div>
					</div>

					{/* Phone */}
					<div className="space-y-2">
						<label className="text-sm text-white/80">Telefon</label>
						<div className="relative">
							<Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
							<Input
								name="phone"
								placeholder="5551112233"
								className="pl-9 h-11 bg-white/10 border-white/10 text-white placeholder:text-white/40"
								autoComplete="tel"
								required
							/>
						</div>
					</div>

					<Button className="w-full h-11 bg-white text-slate-900 hover:bg-white/90 font-semibold">
						Kayıt Ol
					</Button>
				</form>

				<div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
					<div className="font-semibold text-white">Sistemimize Kayıt Olabilirsiniz</div>
					<div className="mt-1 text-white/70">
						Sistemimize Hoşgeldiniz! Kayıt olarak, özel yönetim panelimize erişim sağlayabilirsiniz.
					</div>
				</div>

				<div className="text-sm text-white/70">
					Zaten hesabın var mı?{" "}
					<Link
						href="/admin/auth/login"
						className="text-indigo-200 hover:text-indigo-100 underline-offset-4 hover:underline"
					>
						Giriş Yap
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}
