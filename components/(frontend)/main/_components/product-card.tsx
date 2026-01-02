import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/app/api/product/type"

export default function ProductCard({ product }: { product: Product }) {
	return (
		<Card className="rounded-2xl overflow-hidden hover:shadow-sm transition-shadow bg-white">
			<div className="relative">
				<div className="aspect-4/3 bg-zinc-100"></div>

				{product.stock_quantity <= 0 ? (
					<Badge className="absolute left-3 top-3 bg-zinc-900 text-white">Tükendi</Badge>
				) : (
					<Badge className="absolute left-3 top-3 bg-emerald-600 text-white">Stokta</Badge>
				)}
			</div>

			<CardContent className="p-4 space-y-3">
				<Link href={`/urun/${product.slug}`} className="block">
					<div className="font-semibold line-clamp-2 min-h-11">{product.name}</div>
				</Link>

				<div className="flex items-center justify-between gap-3">
					<div className="text-lg font-bold">1000</div>
					<div className="text-xs text-zinc-500">SKU: {product.sku || "-"}</div>
				</div>

				<Button className="w-full gap-2" disabled={product.stock_quantity <= 0}>
					<ShoppingCart className="h-4 w-4" />
					Sepete Ekle
				</Button>
			</CardContent>
		</Card>
	)
}
