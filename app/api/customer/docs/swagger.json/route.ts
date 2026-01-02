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
	},
	components: {
		schemas: {
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
					customer_number: { type: "string", example: "CUST-0001" },
				},
			},
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
					customer_number: { type: "string", example: "CUST-0001" },
				},
			},
			CreateCustomerResponse: {
				type: "object",
				properties: {
					ok: { type: "boolean", example: true },
					customer: { $ref: "#/components/schemas/Customer" },
				},
			},
		},
	},
}

export async function GET() {
	return NextResponse.json(swaggerDoc)
}
