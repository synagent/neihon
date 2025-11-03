import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    if (!body?.title || typeof body.title !== "string") {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    const mode = (process.env.NEXT_PUBLIC_TASKS_MODE || "auto").toLowerCase(); // auto | mock
    const base = process.env.NEXT_PUBLIC_NEIHON_API_URL || "https://neihon-api.onrender.com";
    const path = process.env.NEIHON_TASKS_PATH || "/tasks";
    const target = `${base}${path}`;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.NEIHON_API_KEY) headers["Authorization"] = `Bearer ${process.env.NEIHON_API_KEY}`;

    async function tryUpstream() {
      const res = await fetch(target, { method: "POST", headers, body: JSON.stringify(body) });
      const text = await res.text();
      let contentType = res.headers.get("content-type") || "application/json";
      if (contentType.includes("application/json")) {
        return new NextResponse(text, { status: res.status, headers: { "content-type": contentType } });
      }
      return NextResponse.json({ ok: res.ok, status: res.status, body: text }, { status: res.status });
    }

    function mockResponse() {
      const now = new Date();
      const id = `mock_${now.getTime()}`;
      return NextResponse.json(
        {
          id,
          title: body.title,
          notes: body.notes ?? null,
          due_at: body.due_at ?? null,
          priority: body.priority ?? "normal",
          created_at: now.toISOString(),
          source: "mock",
        },
        { status: 201 }
      );
    }

    if (mode === "mock") return mockResponse();

    try {
      const upstream = await tryUpstream();
      if (upstream.status >= 200 && upstream.status < 300) return upstream;
      if (upstream.status === 404 || upstream.status >= 500) return mockResponse();
      return upstream;
    } catch {
      return mockResponse();
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Task proxy error" }, { status: 500 });
  }
}
