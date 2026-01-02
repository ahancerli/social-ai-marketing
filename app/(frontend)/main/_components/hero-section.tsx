import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function HeroSection() {
	return (
		<section className="grid gap-4 lg:grid-cols-12">
			{/* Big Hero */}
			<div className="lg:col-span-8 rounded-2xl overflow-hidden border bg-linear-to-br from-zinc-900 via-zinc-900 to-indigo-900 text-white">
				<div className="p-6 md:p-10 grid gap-8 md:grid-cols-2 items-center">
					<div className="space-y-4">
						<Badge className="bg-white/15 text-white hover:bg-white/20">Yeni Sezon</Badge>
						<h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
							Teknoloji alışverişinde <span className="text-fuchsia-300">yeni dönem</span>
						</h1>
						<p className="text-white/80">
							Gaming ekipmanları, bilgisayar, telefon ve daha fazlası. Kampanyaları kaçırma.
						</p>
						<div className="flex flex-wrap gap-3">
							<Button asChild className="bg-white text-zinc-900 hover:bg-zinc-100">
								<Link href="/kampanyalar">Kampanyaları Gör</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								className="border-white/30 text-white hover:bg-white/10"
							>
								<Link href="/urunler">Tüm Ürünler</Link>
							</Button>
						</div>
					</div>

					<div className="relative">
						<div className="aspect-4/3 rounded-xl bg-white/10 border border-white/15 overflow-hidden"></div>
						<div className="absolute -bottom-4 -left-4 rounded-xl bg-white text-zinc-900 px-4 py-3 shadow-lg">
							<div className="text-xs text-zinc-500">Bugüne özel</div>
							<div className="font-bold">Ücretsiz Kargo</div>
						</div>
					</div>
				</div>
			</div>

			{/* Right promos */}
			<div className="lg:col-span-4 grid gap-4">
				<div className="rounded-2xl border bg-white p-6 hover:shadow-sm transition-shadow">
					<div className="text-sm text-zinc-500">Günün Fırsatı</div>
					<div className="mt-1 text-lg font-bold">Gaming Kulaklık %25</div>
					<p className="mt-2 text-sm text-zinc-600">Seçili modellerde stoklarla sınırlı indirim.</p>
					<Button asChild className="mt-4 w-full">
						<Link href="/kampanyalar">İncele</Link>
					</Button>
				</div>

				<div className="rounded-2xl border bg-linear-to-br from-fuchsia-600 to-indigo-600 text-white p-6 hover:shadow-sm transition-shadow">
					<div className="text-sm text-white/80">Yeni Gelenler</div>
					<div className="mt-1 text-lg font-bold">Laptop & Monitör</div>
					<p className="mt-2 text-sm text-white/80">
						Yeni seriler yayında. Performans odaklı seçimler.
					</p>
					<Button asChild variant="secondary" className="mt-4 w-full">
						<Link href="/kategori/bilgisayar">Keşfet</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
