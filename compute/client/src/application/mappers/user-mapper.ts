import { AuthUserDto, NewUserDto } from "@/domain/dto/user.dto"
import { AuthSchema, NewUserSchema } from "../validations/auth-validations"


/**
 * Maps the form data to a NewUserDto object
 * @param formData the form data to map
 * @returns the mapped NewUserDto object or an object with errors
 */
export const createUserMapper = (formData: FormData): NewUserDto | { errors: any } => {
    //Validate the form data
    const validatedFields = NewUserSchema.safeParse({
        name: formData?.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Create a new user object
    const newUser: NewUserDto = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    }

    return newUser
}

/**
 * Maps the form data to an AuthUserDto object
 * @param formData the form data to map
 * @returns the mapped AuthUserDto object or an object with errors
 */
export const authUserMapper = (formData: FormData): AuthUserDto | { errors: any } => {
    //Validate the form data
    const validatedFields = AuthSchema.safeParse({
        email: formData?.get('email'),
        password: formData.get('password'),
    })

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Create an auth user object
    const authUser: AuthUserDto = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    return authUser
}