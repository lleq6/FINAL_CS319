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
        console.log(user)
        if(user){
          const isPasswordMatch = encryptSomething(user.Password) === credentials?.password.toString()
          if(!isPasswordMatch) 
          // console.log(user.Password, credentials?.password)
            {
              console.log('password not match')
              return null

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
        token.name = user.First_Name
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
