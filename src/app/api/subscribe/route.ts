import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const email_lower = email.toLowerCase().trim();
    const db = await getDb();

    const existing = await db.collection("subscribers").findOne({ email: email_lower }, { projection: { _id: 0 } });
    if (existing) {
      return NextResponse.json({
        ok: true,
        already_subscribed: true,
        message: "Your name is already inscribed in the ship's log.",
      });
    }

    const sub = {
      id: uuidv4(),
      email: email_lower,
      source: source || "letter_of_marque",
      created_at: new Date().toISOString(),
    };

    await db.collection("subscribers").insertOne({ ...sub });

    return NextResponse.json({
      ok: true,
      already_subscribed: false,
      message: "Welcome aboard. The fleet sails at dawn.",
      id: sub.id,
    });
  } catch (error) {
    console.error("Subscription failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
