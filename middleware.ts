import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, JWTPayload } from 'jose'; // Import required types

// Define JWT payload type
interface JwtPayload extends JWTPayload {
  name: string;
  email: string;
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

      // Check if the payload contains the required fields
      if (typeof payload.name !== 'string' || typeof payload.email !== 'string') {
        throw new Error('Invalid token payload: Missing name or email');
      }

      const userPayload = payload as JwtPayload;

      // Attach user email to headers if needed
      const headers = new Headers(request.headers);
      headers.set('x-user-email', userPayload.email);

      console.log('Token verified, user email:', userPayload.email);

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