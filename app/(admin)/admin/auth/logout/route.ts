import { NextResponse } from "next/server"

export async function GET(req: Request) {
	const url = new URL("/admin/auth/login", req.url)
	const res = NextResponse.redirect(url)

	res.cookies.set({
		name: "admin_session",
		value: "",
		path: "/",
		maxAge: 0,
	})

	return res
}
