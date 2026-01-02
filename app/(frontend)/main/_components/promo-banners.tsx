import Link from "next/link"

export default function PromoBanners() {
	return (
		<section className="grid gap-4 md:grid-cols-3">
			<Link
				href="/kampanyalar"
				className="rounded-2xl border bg-white p-5 hover:shadow-sm transition-shadow"
			>
				<div className="text-xs text-zinc-500">Kampanya</div>
				<div className="mt-1 font-bold">Sepette ekstra indirim</div>
				<div className="mt-2 text-sm text-zinc-600">Seçili ürünlerde geçerli</div>
			</Link>

			<Link
				href="/kategori/gaming"
				className="rounded-2xl border bg-linear-to-br from-zinc-900 to-zinc-700 text-white p-5 hover:shadow-sm transition-shadow"
			>
				<div className="text-xs text-white/70">Gaming</div>
				<div className="mt-1 font-bold">FPS ekipmanları</div>
				<div className="mt-2 text-sm text-white/70">Mouse, klavye, kulaklık</div>
			</Link>

			<Link
				href="/kategori/telefon"
				className="rounded-2xl border bg-linear-to-br from-indigo-600 to-fuchsia-600 text-white p-5 hover:shadow-sm transition-shadow"
			>
				<div className="text-xs text-white/70">Telefon</div>
				<div className="mt-1 font-bold">Yeni modeller yayında</div>
				<div className="mt-2 text-sm text-white/70">Hızlı teslimat seçenekleri</div>
			</Link>
		</section>
	)
}
