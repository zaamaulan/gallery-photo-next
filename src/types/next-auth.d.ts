import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
  }
  interface Session {
    user: User & {
      id: string;
      username: string;
    };
    tokem: {
      id: string;
      username: string
    }
  }
}