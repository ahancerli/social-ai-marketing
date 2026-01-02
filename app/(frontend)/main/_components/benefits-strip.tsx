import { Truck, ShieldCheck, CreditCard } from "lucide-react"

const ITEMS = [
	{
		icon: Truck,
		title: "Hızlı Teslimat",
		desc: "Aynı gün kargo fırsatları",
	},
	{
		icon: ShieldCheck,
		title: "Güvenli Alışveriş",
		desc: "SSL + 3D Secure ödeme",
	},
	{
		icon: CreditCard,
		title: "Taksit İmkanı",
		desc: "Karta göre taksit seçenekleri",
	},
]

export default function BenefitsStrip() {
	return (
		<section className="grid gap-3 md:grid-cols-3">
			{ITEMS.map((it) => {
				const Icon = it.icon
				return (
					<div key={it.title} className="rounded-2xl border bg-white p-4 flex items-center gap-3">
						<div className="h-11 w-11 rounded-xl bg-zinc-100 flex items-center justify-center">
							<Icon className="h-5 w-5 text-zinc-700" />
						</div>
						<div>
							<div className="font-semibold">{it.title}</div>
							<div className="text-sm text-zinc-600">{it.desc}</div>
						</div>
					</div>
				)
			})}
		</section>
	)
}
