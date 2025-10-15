import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// Simplified middleware for deployment compatibility
	const { pathname } = request.nextUrl;
	
	// Only protect the root path
	if (pathname === "/") {
		const isAuthenticated = Boolean(request.cookies.get("auth_token")?.value);
		if (!isAuthenticated) {
			const url = request.nextUrl.clone();
			url.pathname = "/try";
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
