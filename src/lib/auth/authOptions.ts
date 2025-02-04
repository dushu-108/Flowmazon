import prisma from "@/src/lib/db/prisma";
import { env } from "@/src/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: env.NEXTAUTH_SECRET,
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id;
            return session;
        },
    },
};
