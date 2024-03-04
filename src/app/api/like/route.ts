import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.json({ message: "success" });
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { photoId, userId } = body;

    const addLike = await db.like.create({
      // where: { id: photoId },
      data: {
        photoId: photoId,
        userId: userId,
      },
    });
    return NextResponse.json(
      { like: body, message: "Like created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error", error);
  }
}

export async function DELETE(req: Request) {
  try {
    const { photoId } = await req.json();

    // Hapus like berdasarkan photoId
    await db.like.deleteMany({
      where:{
        photoId: photoId
      }
    });

    return NextResponse.json(
      { message: "Like removed successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error removing like:", error);
    return NextResponse.json(
      { message: "Failed to remove like" },
      { status: 500 },
    );
  }
}
