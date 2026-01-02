// website/types/product.ts

export type Product = {
	product_id: number
	name: string
	slug: string
	sku: string | null
	description: string | null
	price: number
	currency: string
	stock_quantity: number
	is_active: boolean
	created_at: string | null
	updated_at: string | null
	meta_json: string | null
}
