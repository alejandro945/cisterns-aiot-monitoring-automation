'use client'
 
import { AuthenticateUserDto, CreateUserDto } from '@/dto/out/user-out-dto'
import { AuthenticateFormValues } from '@/validations/auth-validations'
//import { cookies } from 'next/headers'

export const AuthService = {
    getProfile: () =>{
        /* const cookieStore = cookies()
        const profile = cookieStore.get('profile')
        return profile */
    },
    authenticateUser: (authUser: AuthenticateFormValues) =>{
        console.log(authUser)
    },
    logout: () =>{

    },
    createUser: (newUser: CreateUserDto) =>{
    },
}