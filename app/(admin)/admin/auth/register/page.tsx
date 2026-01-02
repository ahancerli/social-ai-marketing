import Link from "next/link"
import { Mail, User, Lock } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { registerAction } from "../_actions"

export const metadata = {
	title: "Admin | Register",
}

export default function AdminRegisterPage() {
	return (
		<Card className="rounded-2xl border-white/10 bg-white/5 backdrop-blur">
			<CardHeader className="space-y-1">
				<CardTitle className="text-white text-2xl font-extrabold">Admin Kayıt</CardTitle>
				<p className="text-sm text-white/70">
					Demo ortamı: kayıt simüle edilir. Giriş için admin/admin kullanılır.
				</p>
			</CardHeader>

			<CardContent className="space-y-4">
				<form action={registerAction} className="space-y-4">
					<div className="space-y-2">
						<label className="text-sm text-white/80">Ad Soyad</label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
							<Input
								name="fullname"
								placeholder="Admin User"
								className="pl-9 h-11 bg-white/10 border-white/10 text-white placeholder:text-white/40"
								required
							/>
						</div>
					</div>

					<div className="space-y-2">
						<label className="text-sm text-white/80">Email</label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
							<Input
								name="email"
								type="email"
								placeholder="admin@site.com"
								className="pl-9 h-11 bg-white/10 border-white/10 text-white placeholder:text-white/40"
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
								placeholder="••••••••"
								className="pl-9 h-11 bg-white/10 border-white/10 text-white placeholder:text-white/40"
								required
							/>
						</div>
					</div>

					<Button className="w-full h-11 bg-white text-slate-900 hover:bg-white/90 font-semibold">
						Kayıt Ol
					</Button>
				</form>

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
