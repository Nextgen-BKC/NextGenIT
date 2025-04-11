import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbCon';
import Member from '@/models/membersModel';

// GET all members
export async function GET() {
    try {
      await dbConnect();
      
      const members = await Member.find({})
        .sort({ createdAt: -1 })
        .lean(); // Convert Mongoose documents to plain JavaScript objects
  
      return NextResponse.json(
        { 
          success: true,
          data: members 
        },
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store, max-age=0'
          }
        }
      );
  
    } catch (error) {
      console.error('Database Error:', error);
      return NextResponse.json(
        { 
          success: false,
          error: 'Internal server error',
          message: 'Failed to fetch members data'
        },
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
  }

// POST new member
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Check if email already exists
    const existingMember = await Member.findOne({ email: body.email });
    if (existingMember) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }
    
    const member = await Member.create(body);
    return NextResponse.json(member, { status: 201 });
  } catch (error: any) {
    console.error('Error creating member:', error);
    const status = error.name === 'ValidationError' ? 400 : 500;
    const message = error.name === 'ValidationError' 
      ? Object.values(error.errors).map((err: any) => err.message).join(', ')
      : 'Failed to create member';
    
    return NextResponse.json({ error: message }, { status });
  }
}