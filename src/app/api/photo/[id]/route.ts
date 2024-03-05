import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  try {
    const { id } = context.params;
    // const filter = req.nextUrl.searchParams.get("filter");

    const photos = await db.photo.findUnique({
      where: {
        id: id,
      },
      include: { user: true },
    });

    return NextResponse.json(photos);
  } catch (error) {}
}
