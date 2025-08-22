import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      username?: string;
    } & DefaultSession["user"];

    accessToken?: string;
  }

  interface JWT {
    id?: string;
    username?: string;
    accessToken?: string;
  }
}
