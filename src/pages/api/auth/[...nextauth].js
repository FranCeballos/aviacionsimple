import { verifyPassword } from "@/src/lib/auth";
import { connectToDatabase } from "@/src/lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.customId = user.customId;
        token.fullName = `${user.firstName} ${user.lastName}`;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        customId: token.customId,
        fullName: token.fullName,
        email: token.email,
        isAdmin: token.isAdmin,
      };
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const db = client.db();

        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          client?.close();
          throw new Error("No hay un usuario registrado con ese email");
        }

        const passwordIsValid = await verifyPassword(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordIsValid) {
          client?.close();
          throw new Error("Email y/o contraseña no son correctas");
        }

        client?.close();
        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
