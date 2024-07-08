import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { generateRandomString } from "@/app/lib/utils";
import CredentialsProvider from "next-auth/providers/credentials";
import servicesConfig from "@/app/config/services";

export const authConfig: NextAuthOptions ={
  providers: [
    GoogleProvider({
        clientId: servicesConfig.googleId,
        clientSecret: servicesConfig.googleSecret,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      }),
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "Credentials",
        credentials: {
          email: {},
          password: {},
        },
        async authorize(credentials, req) {
            
            if(!credentials){
              return null;
            }

            return {
              id: generateRandomString(11),
              email: credentials?.email,
              username: credentials?.email,
            };
  
        },
      }),      
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // You can return `false` to reject the sign-in
      if(!user || !user.email)
        return false;

      // Handle user data (e.g., store it in a database)
      return true;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        //token.accessToken = account.access_token
        //token.id = profile.id
      }
      return token
    },    
    async session({ session, token, user }) {
      // Send properties to the client, like user id from a provider.

      session.user.id = token.id
      
      return session
    },
    async redirect({url, baseUrl}) {
      return url.startsWith(baseUrl + '/auth')
        ? Promise.resolve(baseUrl + '/calls')
        : Promise.resolve(url);
    },    
  },
  pages: {
    signIn: '/auth',
  },
  session: {
    maxAge: 7 * 24 * 60 * 60,
    strategy: "jwt",
  },

} ;

export const getSession = () => getServerSession(authConfig);
