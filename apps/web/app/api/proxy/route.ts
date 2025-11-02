import { NextResponse, NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path") || "/health";

    if (!path.startsWith("/")) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const ALLOW = new Set<string>(["/", "/health", "/openapi.json", "/docs"]);
    if (!ALLOW.has(path)) {
      return NextResponse.json({ error: "Path not allowed" }, { status: 403 });
    }

    const base = process.env.NEXT_PUBLIC_NEIHON_API_URL || "https://neihon-api.onrender.com";
    const target = `${base}${path}`;

    const res = await fetch(target, { cache: "no-store" });
    const text = await res.text();

    return new NextResponse(text, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") || "application/json"
      }
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Proxy error" }, { status: 500 });
  }
}
