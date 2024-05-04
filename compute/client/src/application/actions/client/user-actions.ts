import { signIn } from "@/application/auth";
import { AuthUserDto } from "@/domain/dto/user.dto";
import { dbConnect } from "@/infrastructure/database/mongo-client.database";
import { AuthError } from "next-auth";

/**
 * Function with the responsibility of validating the form data and call
 * gateway interface to authenticate a user
 * @param authUserDto - The form data to authenticate a user
 * @returns - Errors if the form data is invalid, otherwise the authenticated user
 */
export async function authUser(authUserDto: AuthUserDto) {
    try {
        await dbConnect();
        await signIn('credentials', authUserDto);
    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
