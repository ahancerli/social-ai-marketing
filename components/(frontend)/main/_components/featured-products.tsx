import Link from "next/link"
import { Button } from "@/components/ui/button"
import SectionTitle from "./section-title"
import ProductCard from "./product-card"
import type { Product } from "@/app/api/product/type"

export default function FeaturedProducts({ products }: { products: Product[] }) {
	return (
		<section className="space-y-4">
			<SectionTitle
				title="Yeni Gelenler"
				subtitle="En son eklenen ürünler"
				right={
					<Button asChild variant="outline">
						<Link href="/urunler">Tümünü Gör</Link>
					</Button>
				}
			/>

			{products.length === 0 ? (
				<div className="rounded-2xl border bg-white p-6 text-sm text-zinc-600">
					Şu an gösterilecek ürün bulunamadı. (Veritabanında aktif ürün yok veya bağlantı hatası
					olabilir.)
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{products.map((p) => (
						<ProductCard key={p.product_id} product={p} />
					))}
				</div>
			)}
		</section>
	)
}
