"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  try {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    // Hashing the password securely
    const hashedPassword = await bcrypt.hash(password as string, 10);

    // Checking if username or email already exists in the database
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username as string },
    });

    const existingUserByEmail = await db.user.findFirst({
      where: { email: email as string },
    });

    if (existingUserByUsername) {
      return { error: "Username already exists" };
    }

    if (existingUserByEmail) {
      return { error: "Email already exists" };
    }

    // Creating a new user in the database
    const newUser = await db.user.create({
      data: {
        username: username as string,
        email: email as string,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      throw new Error("Failed to create new user");
    }

    // Redirecting to the sign-in page after successful sign-up
    redirect("/auth/sign-in");
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throwing the error for higher-level error handling or logging
  }
}
