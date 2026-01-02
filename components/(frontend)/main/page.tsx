import HeroSection from "./_components/hero-section"
import BenefitsStrip from "./_components/benefits-strip"
import CategoryGrid from "./_components/category-grid"
import FeaturedProducts from "./_components/featured-products"
import PromoBanners from "./_components/promo-banners"
import type { Product } from "@/app/api/product/type"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export const metadata = {
	title: "Ana Sayfa | E-Ticaret",
	description: "Teknoloji ürünleri, fırsatlar ve kampanyalar",
}

export default async function MainHomePage() {
	const featured: Product[] = [
		{
			product_id: 1,
			seller_user_id: 1,
			name: "Ürün 1",
			slug: "urun-1",
			sku: "SKU001",
			description: "Bu ürün 1'in açıklamasıdır.",
			price: 1000,
			currency: "TRY",
			stock_quantity: 10,
			is_active: true,
			created_at: null,
			updated_at: null,
			meta_json: null,
		},
		{
			product_id: 2,
			seller_user_id: 1,
			name: "Ürün 2",
			slug: "urun-2",
			sku: "SKU002",
			description: "Bu ürün 2'nin açıklamasıdır.",
			price: 2000,
			currency: "TRY",
			stock_quantity: 0,
			is_active: true,
			created_at: null,
			updated_at: null,
			meta_json: null,
		},
	]
	return (
		<div className="space-y-10 py-6 md:py-8">
			<HeroSection />
			<BenefitsStrip />
			<PromoBanners />
			<CategoryGrid />
			<FeaturedProducts products={featured} />
		</div>
	)
}
