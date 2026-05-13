import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { client_name } = body;

    if (!client_name) {
      return NextResponse.json({ error: "client_name is required" }, { status: 400 });
    }

    const db = await getDb();
    const statusObj = {
      id: uuidv4(),
      client_name,
      timestamp: new Date().toISOString(),
    };

    await db.collection("status_checks").insertOne({ ...statusObj });

    return NextResponse.json(statusObj);
  } catch (error) {
    console.error("Status check failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const statusChecks = await db.collection("status_checks").find({}, { projection: { _id: 0 } }).limit(1000).toArray();
    return NextResponse.json(statusChecks);
  } catch (error) {
    console.error("Failed to fetch status checks", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
