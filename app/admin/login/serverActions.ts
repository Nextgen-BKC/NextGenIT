"use server";
import dbConnect from "@/lib/dbCon";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import generateToken from "@/utils/TokenGen";
import { cookies } from "next/headers";

export async function loginUser({ email, password }: { email: string; password: string }) {
  await dbConnect();
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(user.name, user.email);
  const cookieStore = await cookies();
  cookieStore.set(
    "token",
    token,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    }
  );
  return { id: (user as any)._id.toString(), email: user.email };
}

export async function signupUser({ name, email, password }: { name: string; email: string; password: string }) {
  await dbConnect();
  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required.');
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    throw new Error('Invalid email format.');
  }
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email.');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });
  return { name: newUser.name, email: newUser.email };
} 