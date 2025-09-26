import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;

  // veřejné routy
  if (
    path === "/" ||
    path.startsWith("/images/") ||
    path.startsWith("/favicon.ico") ||
    path.startsWith("/_next/")
  ) {
    return;
  }

  await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}