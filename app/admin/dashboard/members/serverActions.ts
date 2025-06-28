"use server";
import dbConnect from "@/lib/dbCon";
import Member from "@/models/membersModel";

export async function getMembers() {
  await dbConnect();
  const members = await Member.find({}).sort({ createdAt: -1 }).lean();
  return members.map((m: any) => ({
    _id: m._id.toString(),
    name: m.name,
    email: m.email,
    role: m.role,
    status: m.status,
    userImage: m.userImage || '',
  }));
}

export async function addMember(member: {
  name: string;
  email: string;
  role: string;
  status: string;
  userImage?: string;
}) {
  await dbConnect();
  const existingMember = await Member.findOne({ email: member.email });
  if (existingMember) {
    throw new Error('Email already exists');
  }
  const newMember = await Member.create(member);
  return {
    _id: newMember._id.toString(),
    name: newMember.name,
    email: newMember.email,
    role: newMember.role,
    status: newMember.status,
    userImage: newMember.userImage || '',
  };
}

export async function updateMember(id: string, member: any) {
  await dbConnect();
  const updatedMember = await Member.findByIdAndUpdate(id, member, {
    new: true,
    runValidators: true,
  });
  if (!updatedMember) throw new Error("Member not found");
  return {
    _id: updatedMember._id.toString(),
    name: updatedMember.name,
    email: updatedMember.email,
    role: updatedMember.role,
    status: updatedMember.status,
    userImage: updatedMember.userImage || '',
  };
}

export async function deleteMember(id: string) {
  await dbConnect();
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new Error("Invalid member ID format");
  }
  const deletedMember = await Member.findByIdAndDelete(id);
  if (!deletedMember) throw new Error("Member not found");
  return { _id: deletedMember._id.toString() };
} 