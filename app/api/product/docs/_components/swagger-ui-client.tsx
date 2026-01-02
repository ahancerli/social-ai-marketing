"use client"

import dynamic from "next/dynamic"
import "swagger-ui-react/swagger-ui.css"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false }) as any

export default function SwaggerUIClient() {
	return (
		<div style={{ minHeight: "100vh" }}>
			<SwaggerUI url="/api/product/docs/swagger.json" />
		</div>
	)
}
