import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    if (!body?.title || typeof body.title !== "string") {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    const base = process.env.NEXT_PUBLIC_NEIHON_API_URL || "https://neihon-api.onrender.com";
    const target = `${base.replace(/\/$/, "")}/tasks`;

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.NEIHON_API_KEY) {
      headers.Authorization = `Bearer ${process.env.NEIHON_API_KEY}`;
    }

    const res = await fetch(target, { method: "POST", headers, body: JSON.stringify(body) });
    const text = await res.text();

    try {
      return new NextResponse(text, {
        status: res.status,
        headers: { "content-type": res.headers.get("content-type") || "application/json" },
      });
    } catch {
      return NextResponse.json({ ok: res.ok, status: res.status, body: text }, { status: res.status });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Task proxy error" }, { status: 500 });
  }
}
