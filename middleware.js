import { NextResponse } from "next/server";
import { auth } from "./middlewares/apis/authMiddleware";
import { loggingMiddleware } from "./middlewares/apis/loggingMiddleware";

export const config = {
  matcher: "/api/:path*",
};

export default function middleware(request) {
  if (request.url.includes("/api/notes")) {
    const logResult = loggingMiddleware(request);
    console.log("Request: ", logResult.response);
  }

  const authResult = auth(request);
  if (!authResult.isValid) {
    return new Response(JSON.stringify({ message: authResult.message }), {
      status: 401,
    });
  }
  return NextResponse.next();
}
