export const metadata = {
	title: "Admin Auth",
}

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-slate-950 text-white">
			<div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.25),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(217,70,239,0.20),transparent_55%)]">
				<div className="mx-auto max-w-7xl min-h-screen grid lg:grid-cols-2">
					{/* Left marketing */}
					<div className="hidden lg:flex flex-col justify-between p-10">
						<div className="flex items-center gap-3">
							<div className="h-11 w-11 rounded-2xl bg-linear-to-br from-indigo-500 to-fuchsia-600" />
							<div>
								<div className="font-extrabold text-xl">TeknoStore</div>
								<div className="text-sm text-white/70 -mt-0.5">Admin Panel</div>
							</div>
						</div>

						<div className="max-w-md">
							<div className="text-3xl font-extrabold leading-tight">
								Velzon stilinde <span className="text-indigo-300">profesyonel</span> yönetim paneli
							</div>
							<p className="mt-3 text-white/75">
								Sipariş yönetimi, ürün yönetimi, kullanıcılar ve raporlar. Güvenli oturum ile
								erişim.
							</p>

							<div className="mt-6 space-y-3 text-sm text-white/80">
								<div>✅ Modern UI / UX</div>
								<div>✅ Sidebar + Topbar düzeni</div>
								<div>✅ Auth koruması (middleware)</div>
							</div>
						</div>

						<div className="text-xs text-white/50">
							© {new Date().getFullYear()} TeknoStore Admin
						</div>
					</div>

					{/* Right auth content */}
					<div className="flex items-center justify-center px-4 py-10">
						<div className="w-full max-w-md">{children}</div>
					</div>
				</div>
			</div>
		</div>
	)
}
