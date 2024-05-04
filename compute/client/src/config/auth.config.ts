import { MAIN_CONSTANTS } from '@/presentation/constants/main.constants';
import axios from 'axios';
import type { NextAuthConfig } from 'next-auth';

const BASE_URL = process.env.NEXT_BASE_URL || 'http://localhost:3000';

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account && account.type === "credentials") {
        token.userId = account.providerAccountId;
      }else if (account && (account.provider === "github" || account.provider === "google")) {
        //Validar si el usuario ya existe en capa de persistencia
        const response = await axios.post(`${BASE_URL}/api/users`, { email: token.email || '', name: token.name || '', provider: account.provider});
        const user = response.data
        token.userId = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user.id = token.userId;
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
