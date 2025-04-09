import { NextResponse } from 'next/server';

export async function POST() {
  // Create a response indicating that the signout was successful
  const response = NextResponse.json({ message: 'Signout successful' });

  // Clear the 'token' cookie by setting its value to an empty string and expiration to a past date
  response.cookies.set({
    name: 'token',
    value: '',
    expires: new Date(0),  // Set to epoch time (1970) to expire the cookie immediately
    path: '/',  // The cookie is valid for the entire domain
  });

  // Return the response
  return response;
}
