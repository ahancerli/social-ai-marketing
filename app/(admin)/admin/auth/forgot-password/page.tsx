import Link from "next/link"
import { Mail } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { forgotPasswordAction } from "../_actions"

export const metadata = {
	title: "Admin | Forgot Password",
}

export default function AdminForgotPasswordPage() {
	return (
		<Card className="rounded-2xl border-white/10 bg-white/5 backdrop-blur">
			<CardHeader className="space-y-1">
				<CardTitle className="text-white text-2xl font-extrabold">Şifremi Unuttum</CardTitle>
				<p className="text-sm text-white/70">
					Email gir, şifre sıfırlama talebini oluşturalım. (Demo)
				</p>
			</CardHeader>

			<CardContent className="space-y-4">
				<form action={forgotPasswordAction} className="space-y-4">
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

					<Button className="w-full h-11 bg-white text-slate-900 hover:bg-white/90 font-semibold">
						Sıfırlama Linki Gönder
					</Button>
				</form>

				<div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
					Demo ortamında giriş bilgisi: <b>admin / admin</b>
				</div>

				<div className="text-sm text-white/70">
					<Link
						href="/admin/auth/login"
						className="text-indigo-200 hover:text-indigo-100 underline-offset-4 hover:underline"
					>
						Giriş sayfasına dön
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}
