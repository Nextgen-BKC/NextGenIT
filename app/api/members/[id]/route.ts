import dbConnect from "@/lib/dbCon";
import Member from "@/models/membersModel";
import { NextRequest, NextResponse } from "next/server";

// PUT: Update a member
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string   } }
) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await req.json();
    
    const updatedMember = await Member.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMember) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Member updated successfully",
      data: updatedMember
    });
  } catch (error) {
    console.error("PUT /members/:id error:", error);
    return NextResponse.json(
      { message: "Failed to update member" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a member
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;

    // Validate the format of the ID (if required)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { message: "Invalid member ID format" },
        { status: 400 }
      );
    }

    const deletedMember = await Member.findByIdAndDelete(id);

    if (!deletedMember) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Member deleted successfully",
        data: deletedMember,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /members/:id error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}