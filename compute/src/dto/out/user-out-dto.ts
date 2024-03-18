export type AuthenticateUserDto = {
    email: string
    password: string
}

export type CreateUserDto = {
    name: string
    email: string
    password: string
    confirmPassword: string
}