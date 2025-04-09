import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Import from 'jose'

// Define JWT payload type
interface JwtPayload {
  name: string;
  email: string;
  iat?: number;
  exp?: number;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the requested path starts with '/admin' (protect all /admin paths)
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;

    // If no token, redirect to the /admins/login page
    if (!token) {
      console.log('No token found, redirecting to /admins/login');
      return NextResponse.redirect(new URL('/admins/login', request.url));
    }

    try {
      // Verify the token using the 'jose' library
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

      // Attach user email to headers if needed
      const headers = new Headers(request.headers);
      headers.set('x-user-email', (payload as JwtPayload).email);

      console.log('Token verified, user email:', (payload as JwtPayload).email);

      return NextResponse.next({
        request: {
          headers,
        },
      });
    } catch (error) {
      console.error('Invalid token:', error);
      // If the token is invalid, delete it and redirect to the /admins/login page
      const response = NextResponse.redirect(new URL('/admins/login', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  // Allow all other requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Protect all paths under /admin
};
