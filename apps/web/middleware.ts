import { NextResponse, NextRequest } from "next/server";

export const config = {
  matcher: ["/api/proxy"],
};

export async function middleware(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    req.ip ||
    "0.0.0.0";

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) return NextResponse.next();

  const { Ratelimit } = await import("@upstash/ratelimit");
  const { Redis } = await import("@upstash/redis");

  const redis = new Redis({ url: redisUrl, token: redisToken });
  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(60, "1 m"),
    analytics: false,
    prefix: "neihon:rl",
  });

  const { success, reset, remaining } = await ratelimit.limit(`proxy:${ip}`);
  const res = success
    ? NextResponse.next()
    : NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  res.headers.set("X-RateLimit-Limit", "60");
  res.headers.set("X-RateLimit-Remaining", String(remaining ?? 0));
  res.headers.set("X-RateLimit-Reset", String(reset ?? 0));
  return res;
}
