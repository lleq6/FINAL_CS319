import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { query } from '../../lib/db'
import { fetchOneUser } from "../../lib/db";

function encryptSomething(text : string){
//เข้ารหัสข้อมูล

  return text
}

export const authConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const fetch = await fetchOneUser(credentials?.email);
        const user = fetch.rows[0]
        if(user){
          const isPasswordMatch = encryptSomething(user.password) == credentials?.password
          if(!isPasswordMatch) return null 
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
        token.name = user.Full_Name
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.name
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST }
