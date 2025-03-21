import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import dbConnect from "@/lib/db-connect";
import { User } from "@/models/User";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          await dbConnect();

          const user = await User.findOne({ email: credentials.email });

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }

      if (trigger === "update" && session) {
        if (session.user?.name) {
          token.name = session.user.name;
        }
        if (session.user?.email) {
          token.email = session.user.email;
        }
        if (session.user?.image) {
          token.image = session.user.image;
        }
      }

      return token;
    },
    
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id || token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      
      return session;
    },
  },
  events: {
    async session({ session }: any) {
      console.log("Session event, user:", session?.user?.email);
    },
    async signIn({ user }: any) {
      console.log("Sign in event:", user?.email);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};