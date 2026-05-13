import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const count = await db.collection("subscribers").countDocuments({});
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Failed to get subscriber count", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
