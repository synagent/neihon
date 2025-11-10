import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.info("[waitlist]", payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[waitlist:error]", error);
    return NextResponse.json({ error: "Unable to capture waitlist request" }, { status: 500 });
  }
}
