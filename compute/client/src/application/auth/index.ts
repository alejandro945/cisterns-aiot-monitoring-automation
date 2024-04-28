import NextAuth from 'next-auth';
import { authConfig } from '@/config/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { UsersGateway } from '@/infrastructure/gateway/users.gateway';
import { AuthUserDto } from '@/domain/dto/user.dto';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({
    async authorize(credentials) {
        const gateway = new UsersGateway();
        return await gateway.auth(credentials as AuthUserDto);
    }
  })],
});