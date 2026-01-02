import { NextRequest, NextResponse } from "next/server"

const ADMIN_COOKIE = "admin_session"

export function middleware(req: NextRequest) {
	const { pathname, search } = req.nextUrl

	// sadece /admin ve altını koruyoruz
	if (!pathname.startsWith("/admin")) return NextResponse.next()

	const session = req.cookies.get(ADMIN_COOKIE)?.value

	// /admin/auth/* serbest
	if (pathname.startsWith("/admin/auth")) {
		// login/register sayfasına auth olmuşken gidilirse /admin'e at
		if (session && (pathname === "/admin/auth/login" || pathname === "/admin/auth/register")) {
			return NextResponse.redirect(new URL("/admin", req.url))
		}
		return NextResponse.next()
	}

	// panel route'ları: auth yoksa login
	if (!session) {
		const loginUrl = new URL("/admin/auth/login", req.url)
		loginUrl.searchParams.set("next", pathname + search)
		return NextResponse.redirect(loginUrl)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/admin/:path*"],
}
