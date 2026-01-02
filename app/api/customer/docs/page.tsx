"use client"

import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export default function CustomerSwaggerPage() {
	return (
		<div style={{ minHeight: "100vh" }}>
			<SwaggerUI url="/api/customer/docs/swagger.json" />
		</div>
	)
}
