import Link from "next/link"

export default function SiteFooter() {
	return (
		<footer className="mt-12 border-t border-zinc-200 bg-white">
			<div className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid gap-8 md:grid-cols-4">
				<div>
					<div className="font-extrabold text-lg">TeknoStore</div>
					<p className="mt-2 text-sm text-zinc-600">
						Teknoloji ürünlerinde hızlı teslimat, güvenli ödeme ve avantajlı kampanyalar.
					</p>
				</div>

				<div className="space-y-2">
					<div className="font-semibold">Kurumsal</div>
					<Link className="block text-sm text-zinc-600 hover:underline" href="/hakkimizda">
						Hakkımızda
					</Link>
					<Link className="block text-sm text-zinc-600 hover:underline" href="/kariyer">
						Kariyer
					</Link>
					<Link className="block text-sm text-zinc-600 hover:underline" href="/magazalar">
						Mağazalar
					</Link>
				</div>

				<div className="space-y-2">
					<div className="font-semibold">Yardım</div>
					<Link className="block text-sm text-zinc-600 hover:underline" href="/yardim">
						S.S.S
					</Link>
					<Link className="block text-sm text-zinc-600 hover:underline" href="/iade">
						İade & İptal
					</Link>
					<Link className="block text-sm text-zinc-600 hover:underline" href="/kargo">
						Kargo & Teslimat
					</Link>
				</div>

				<div className="space-y-2">
					<div className="font-semibold">İletişim</div>
					<p className="text-sm text-zinc-600">destek@teknostore.com</p>
					<p className="text-sm text-zinc-600">+90 (212) 000 00 00</p>
				</div>
			</div>

			<div className="border-t border-zinc-200">
				<div className="mx-auto max-w-7xl px-4 md:px-6 py-4 text-xs text-zinc-500 flex items-center justify-between">
					<span>© {new Date().getFullYear()} TeknoStore</span>
					<span>Güvenli Alışveriş • 3D Secure • SSL</span>
				</div>
			</div>
		</footer>
	)
}
