import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Sets x-pathname header so the root layout can read the current route
// and conditionally set lang/dir on <html> for Arabic pages.
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  response.headers.set('x-pathname', request.nextUrl.pathname)
  return response
}

export const config = {
  // Run on all routes except static files and Next internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
