import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the built-in session and user types
declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
  }
}
