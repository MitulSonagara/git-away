import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      authorization: {
        params: {
          scope: "repo user:email", // Add repo scope for private repos
        },
      },
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          login: profile.login,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // store sessions in Prisma
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Runs on first sign-in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }

      // Save GitHub access token
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      if (profile?.login) {
        token.username = profile.login;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
        session.user.username = token.username as string;
      }

      session.accessToken = token.accessToken as string;

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
