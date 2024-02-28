import { withAuth } from "next-auth/middleware";
import { redirect } from "next/navigation";

// middleware is applied to all routes, use conditionals to select

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (!req.nextUrl.pathname.startsWith("/auth") && token === null) {
        return false;
      }

      return true;
    },
  },
});

// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
 
// export default NextAuth(authConfig).auth;
 
// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };