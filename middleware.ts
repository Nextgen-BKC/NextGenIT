import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Import from 'jose'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the requested path starts with '/admin' but exclude '/admin/login'
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('token')?.value;

    // If no token, redirect to the /admin/login page
    if (!token) {
      console.log('No token found, redirecting to /admin/login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify the token using the 'jose' library
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

      return NextResponse.next();
    } catch (error) {
      console.error('Invalid token:', error);
      // If the token is invalid, delete it and redirect to the /admin/login page
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  // Allow all other requests to pass through (including /admin/login)
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Protect all paths under /admin
};