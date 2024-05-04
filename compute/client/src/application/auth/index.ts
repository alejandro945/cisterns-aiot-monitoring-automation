import NextAuth from 'next-auth';
import { authConfig } from '@/config/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { auth as authUser } from '@/infrastructure/gateway/users.gateway';
import { AuthUserDto } from '@/domain/dto/user.dto';
import github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        return await authUser(credentials as AuthUserDto);
      }
    }),
    github,
    google
  ],
});