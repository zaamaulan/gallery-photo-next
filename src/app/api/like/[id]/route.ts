import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  
  try {
    const { id } = context.params;
    const likes = await db.like.findMany({
      where: { photoId: id },
      // include: {
      //   user: true,
      // },
    });

    return NextResponse.json(likes);

    // return NextResponse.json({message: "Success"})
  } catch (error) {
    console.log("Failed to fetch data", error);
  }
}
