import { AuthUserDto } from "@/domain/dto/user.dto";
import { AuthError } from "next-auth";
import { signIn, signOut } from "next-auth/react";

/**
 * Function with the responsibility of validating the form data and call
 * gateway interface to authenticate a user
 * @param authUserDto - The form data to authenticate a user
 * @returns - Errors if the form data is invalid, otherwise the authenticated user
 */
export async function authUser(authUserDto: AuthUserDto) {
    return await signIn('credentials', { ...authUserDto, redirect: false });
}

/**
 * Function to handle the logout event
 */
export const logoutUser = async () => {
    try {
        await signOut({ redirect: true, callbackUrl: '/' })
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
}
