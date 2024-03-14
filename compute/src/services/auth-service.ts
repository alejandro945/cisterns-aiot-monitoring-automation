import { cookies } from 'next/headers'

export const AuthService = {
    getProfile: () =>{
        const cookieStore = cookies()
        const profile = cookieStore.get('profile')
        return profile
    },
    login: () =>{

    },
    logout: () =>{

    },
}