/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import dynamic from "next/dynamic"
import "swagger-ui-react/swagger-ui.css"

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false }) as any

export default function SwaggerUIClient() {
	return (
		<div style={{ minHeight: "100vh" }}>
			<SwaggerUI url="/api/customer/docs/swagger.json" />
		</div>
	)
}
