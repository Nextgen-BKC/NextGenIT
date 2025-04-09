// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbCon';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email.' },
        { status: 409 }
      );
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log('✅ New user registered:', newUser.email);

    return NextResponse.json(
      {
        message: 'Signup successful',
        user: { name: newUser.name, email: newUser.email }, // no password
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};

export const GET = () => {
  return NextResponse.json(
    { error: 'GET method not allowed on this route.' },
    { status: 405 }
  );
};
