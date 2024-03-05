import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(30),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function GET() {
  return NextResponse.json({ message: "success" });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = userSchema.parse(body);;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });

    const existingUserByEmail = await db.user.findFirst({
      where: { email: email },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "Username already taken",
        },
        { status: 409 },
      );
    }

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "Email already taken" },
        { status: 409 },
      );
    }

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Error occurred", error }, { status: 500 });
  }
}
