import NextAuth from 'next-auth';
import { authConfig } from '@/config/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { UsersGateway } from '@/infrastructure/gateway/users.gateway';
import { AuthUserDto } from '@/domain/dto/user.dto';
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const gateway = new UsersGateway();
        return await gateway.auth(credentials as AuthUserDto);
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
});