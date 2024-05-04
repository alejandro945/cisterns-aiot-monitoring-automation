import { MAIN_CONSTANTS } from '@/presentation/constants/main.constants';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && account.type === "credentials") { //(2)
        token.userId = account.providerAccountId; // this is Id that coming from authorize() callback 
      }
      return token;
    },
    async session({ session, token, user }) {
      (session as any).user.id = token.userId; //(3)
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = MAIN_CONSTANTS.PROTECTED_ROUTES.includes(nextUrl.pathname);
      if (isProtected) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

//export const getServerAuthSession = () => getServerSession(authConfig);