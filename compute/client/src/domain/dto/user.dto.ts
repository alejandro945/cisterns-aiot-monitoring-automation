import { User } from "../model/User"

export type AuthUserDto = Pick<User, 'email' | 'password'>

export type NewUserDto = User & { confirmPassword: string }