"use server";
import { cookies } from "next/headers";

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", { expires: new Date(0), path: "/" });
} 