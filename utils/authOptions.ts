import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Called when a user signs in
    async signIn({ profile }) {
      // 1. Connect to the database
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email: profile?.email });
      // 3. If not create user
      if (!userExists) {
        // Truncate username if too long
        const username = profile?.name?.slice(0, 20);

        await User.create({
          email: profile?.email,
          username,
          image: profile?.image,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },

    // Modify the session object
    async session({ session }) {
      if (!session.user?.email) return session;

      const user = await User.findOne({ email: session.user.email });

      if (user) {
        (session.user as { id: string }).id = user._id.toString();
      }

      return session;
    },
  },
};
