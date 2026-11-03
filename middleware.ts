import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'd9126_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/portal')) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (sessionCookie) {
    try {
      const session = JSON.parse(decodeURIComponent(sessionCookie));
      if (!session || !session.uid) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }

      const role = String(session.role || 'member').toLowerCase();

      // Enforce District Admin guard at the edge for /portal/executive
      if (pathname.startsWith('/portal/executive') && role !== 'district_admin') {
        const unauthorizedUrl = new URL('/login', request.url);
        unauthorizedUrl.searchParams.set('error', 'unauthorized');
        return NextResponse.redirect(unauthorizedUrl);
      }

      // Enforce Club President / District Admin guard at the edge for /portal/president
      if (
        pathname.startsWith('/portal/president') &&
        role !== 'club_president' &&
        role !== 'president' &&
        role !== 'district_admin'
      ) {
        const unauthorizedUrl = new URL('/login', request.url);
        unauthorizedUrl.searchParams.set('error', 'unauthorized');
        return NextResponse.redirect(unauthorizedUrl);
      }
    } catch {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();
  response.headers.set('x-d9126-portal-guard', 'active');
  return response;
}

export const config = {
  matcher: ['/portal/:path*'],
};
