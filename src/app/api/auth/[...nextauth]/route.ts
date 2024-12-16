import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { hashMD5 } from "../../lib/utils";
import { fetchOneUser } from "../../lib/db";

export const authConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const fetch = await fetchOneUser(credentials?.email);
        const user = fetch.rows[0];
        console.log(user);
        if (user) {
          const isPasswordMatch =
            user.Password === hashMD5(credentials?.password as string);
          if (!isPasswordMatch) {
            return null;
          }
        }
        return user ? user : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.User_ID;
        token.role = user.Access_Level;
        token.name = user.First_Name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.name;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
