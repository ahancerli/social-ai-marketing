import { NextResponse } from "next/server"

export const runtime = "nodejs"

const swaggerDoc = {
	openapi: "3.0.0",
	info: {
		title: "Customer Service API",
		version: "1.0.0",
	},
	paths: {
		"/api/customer/createCustomer": {
			post: {
				summary: "Create customer",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/CreateCustomerRequest" },
						},
					},
				},
				responses: {
					"201": {
						description: "Customer created",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/CreateCustomerResponse" },
							},
						},
					},
					"400": { description: "Validation error" },
					"409": { description: "Customer already exists" },
					"500": { description: "Database error" },
				},
			},
		},

		// ✅ GET CUSTOMER EKLENDİ
		"/api/customer/getCustomer": {
			post: {
				summary: "Get customer(s) by filters",
				description:
					"Body'de gelen filtrelere göre customer kayıtlarını listeler. En az 1 filtre zorunlu. Birden fazla alan gönderilirse AND ile filtreler.",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/GetCustomerRequest" },
						},
					},
				},
				responses: {
					"200": {
						description: "Customers found",
						content: {
							"application/json": {
								schema: { $ref: "#/components/schemas/GetCustomerResponse" },
							},
						},
					},
					"400": { description: "Validation error (no filters or invalid input)" },
					"500": { description: "Database error" },
				},
			},
		},
	},

	components: {
		schemas: {
			// =======================
			// CREATE CUSTOMER
			// =======================
			CreateCustomerRequest: {
				type: "object",
				required: [
					"user_type_id",
					"status",
					"email",
					"phone",
					"display_name",
					"username",
					"customer_number",
				],
				properties: {
					user_type_id: { type: "integer", example: 1 },
					status: { type: "boolean", example: true },
					email: { type: "string", example: "admin@test.com" },
					phone: { type: "string", example: "5551112233" },
					display_name: { type: "string", example: "Akman Test" },
					username: { type: "string", example: "akman" },
					customer_number: { type: "string", example: "WEB-12345678" },
				},
			},

			// =======================
			// CUSTOMER MODEL
			// =======================
			Customer: {
				type: "object",
				properties: {
					user_id: { type: "integer", example: 123 },
					user_type_id: { type: "integer", example: 1 },
					status: { type: "boolean", example: true },
					email: { type: "string", example: "admin@test.com" },
					phone: { type: "string", example: "5551112233" },
					display_name: { type: "string", example: "Akman Test" },
					username: { type: "string", example: "akman" },
					created_at: { type: "string", format: "date-time" },
					updated_at: { type: "string", format: "date-time" },
					meta_json: { type: "string", nullable: true, example: null },
					customer_number: { type: "string", example: "WEB-12345678" },
				},
			},

			CreateCustomerResponse: {
				type: "object",
				properties: {
					ok: { type: "boolean", example: true },
					customer: { $ref: "#/components/schemas/Customer" },
				},
			},

			// =======================
			// GET CUSTOMER
			// =======================
			GetCustomerRequest: {
				type: "object",
				description:
					"En az bir alan gönderilmelidir. Gönderilen alanlara göre AND filtre uygulanır.",
				properties: {
					user_type_id: { type: "integer", example: 1 },
					status: { type: "boolean", example: true },
					email: { type: "string", example: "admin@test.com" },
					username: { type: "string", example: "akman" },
					customer_number: { type: "string", example: "WEB-12345678" },
				},
			},

			GetCustomerResponse: {
				type: "object",
				properties: {
					ok: { type: "boolean", example: true },
					count: { type: "integer", example: 1 },
					customers: {
						type: "array",
						items: { $ref: "#/components/schemas/Customer" },
					},
					filters_applied: {
						type: "object",
						properties: {
							user_type_id: { type: "integer", nullable: true, example: 1 },
							status: { type: "boolean", nullable: true, example: true },
							email: { type: "string", nullable: true, example: "admin@test.com" },
							username: { type: "string", nullable: true, example: "akman" },
							customer_number: { type: "string", nullable: true, example: "WEB-12345678" },
						},
					},
				},
			},
		},
	},
}

export async function GET() {
	return NextResponse.json(swaggerDoc)
}
