// website/types/customer.ts

export type Users = {
	user_id?: number
	user_type_id?: number
	status?: boolean
	email?: string
	phone?: string
	display_name?: string
	username?: string
	created_at?: string
	updated_at?: string
	meta_json?: string | null
	customer_number?: string
}
