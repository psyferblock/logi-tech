import { prisma } from "@/lib/db/prisma";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "@/lib/env";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// since google requires actual values and it cant tell if the env variables are there or not we normally add the exclamation mark "!" which asserts that the env variables are there
// but what if we forgot ? what if there is an error ?
// that is why we installed zod

// we use env becasue we parsed the process.env in the env file where we use zod to validate the variables.
