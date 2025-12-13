
import { withAuth } from "next-auth/middleware";

// This is the actual middleware function Next.js expects
export default withAuth(
  function middleware(req) {
    // You can add custom logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // allow only logged-in users
    },
  }
);

// Protect all admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
