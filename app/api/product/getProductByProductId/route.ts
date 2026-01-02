// website/app/api/product/getProductByProductId/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getPool } from "@/lib/mssql"

export async function POST(req: NextRequest) {
	const { product_id } = await req.json()

	if (!product_id) {
		return NextResponse.json({ error: "product_id is required" }, { status: 400 })
	}

	try {
		const pool = await getPool()
		const result = await pool.request().input("product_id", product_id).query(`
        SELECT * FROM catalog.products WHERE product_id = @product_id
      `)

		if (result.recordset.length === 0) {
			return NextResponse.json({ error: "Product not found" }, { status: 404 })
		}

		return NextResponse.json(result.recordset[0])
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: "Database error" }, { status: 500 })
	}
}
