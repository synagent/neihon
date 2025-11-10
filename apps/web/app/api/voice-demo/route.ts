import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "listening",
    transcript: "Sample capture ready — imagine your daily flow narrated back to you."
  });
}
