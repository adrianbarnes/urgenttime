import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createSession } from "../lib/session";

export const authConfig: NextAuthOptions ={
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // You can return `false` to reject the sign-in
      if(!user || !user.email)
        return false;

      // Handle user data (e.g., store it in a database)
      
      await createSession(account?.id_token as string, user.email as string)
      
      return '/call';
    },
  },
};
