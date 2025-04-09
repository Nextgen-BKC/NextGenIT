import { NextRequest, NextResponse } from 'next/server';
import generateToken from '@/utils/TokenGen';
import bcrypt from 'bcryptjs';
import User from '@/models/userModel';
import dbConnect from '@/lib/dbCon';


interface LoginData {
  email: string;
  password: string;
}

interface ResponseData {
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
  };
  error?: string;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Parse request body
    const { email, password }: LoginData = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json<ResponseData>(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json<ResponseData>(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json<ResponseData>(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user.name, user.email);

    // Return response
    const response = NextResponse.json({ 
      message: 'Login successful', 
      user: { id: user._id, email: user.email } 
    });
    
    // Set cookie with these parameters
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Add this
      sameSite: 'lax', // Change from 'strict'
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json<ResponseData>(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

