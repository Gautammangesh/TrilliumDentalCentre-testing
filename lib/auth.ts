import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "@/lib/db/mongodb"
import Admin from "@/lib/models/admin.model"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        await connectDB()

        const admin = await Admin.findOne({ email: credentials.email }).select("+password")

        if (!admin || !admin.isActive) {
          throw new Error("Invalid credentials")
        }

        const isPasswordValid = await admin.comparePassword(credentials.password)

        if (!isPasswordValid) {
          throw new Error("Invalid credentials")
        }

        // Update last login
        admin.lastLogin = new Date()
        await admin.save()

        return {
          id: admin._id.toString(),
          email: admin.email,
          name: admin.name,
          role: admin.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
