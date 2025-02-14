export { auth as middleware } from "@/auth";

// import { type NextRequest, NextResponse, type NextFetchEvent } from "next/server";
// import ratelimit from "@/ratelimit";

// export default async function middleware(
//   request: NextRequest,
//   context: NextFetchEvent,
// ): Promise<Response | undefined> {
//   const ip = request.headers.get('x-forwarded-for') ?? "127.0.0.1";

//   const { success, pending, limit, remaining } = await ratelimit.limit(ip);
//   // we use context.waitUntil since analytics: true.
//   // see https://upstash.com/docs/oss/sdks/ts/ratelimit/gettingstarted#serverless-environments
//   context.waitUntil(pending);

//   const res = success
//     ? NextResponse.next()
//     : NextResponse.redirect(new URL("/api/blocked", request.url));

//   res.headers.set("X-RateLimit-Success", success.toString());
//   res.headers.set("X-RateLimit-Limit", limit.toString());
//   res.headers.set("X-RateLimit-Remaining", remaining.toString());

//   return res;
// }

// export const config = {
//   matcher: "/api",
// };