import Link from "next/link"
import { Laptop, Smartphone, Headphones, Tv2, Gamepad2, Cable } from "lucide-react"
import SectionTitle from "./section-title"

const CATS = [
	{ title: "Bilgisayar", href: "/kategori/bilgisayar", icon: Laptop },
	{ title: "Telefon", href: "/kategori/telefon", icon: Smartphone },
	{ title: "Kulaklık", href: "/kategori/kulaklik", icon: Headphones },
	{ title: "TV & Görüntü", href: "/kategori/tv", icon: Tv2 },
	{ title: "Gaming", href: "/kategori/gaming", icon: Gamepad2 },
	{ title: "Aksesuar", href: "/kategori/aksesuar", icon: Cable },
]

export default function CategoryGrid() {
	return (
		<section className="space-y-4">
			<SectionTitle title="Kategoriler" subtitle="Aradığın ürüne hızlıca ulaş" />

			<div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
				{CATS.map((c) => {
					const Icon = c.icon
					return (
						<Link
							key={c.href}
							href={c.href}
							className="rounded-2xl border bg-white p-4 hover:shadow-sm transition-shadow flex flex-col items-center text-center gap-2"
						>
							<div className="h-12 w-12 rounded-xl bg-zinc-100 flex items-center justify-center">
								<Icon className="h-6 w-6 text-zinc-700" />
							</div>
							<div className="font-medium">{c.title}</div>
						</Link>
					)
				})}
			</div>
		</section>
	)
}
