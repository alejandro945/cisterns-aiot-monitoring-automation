'use server'

import { AuthUserDto, NewUserDto } from "@/domain/dto/user.dto"
import { AuthSchema, NewUserSchema } from "../validations/auth-validations"
import { UsersGateway } from "@/infrastructure/gateway/users.gateway"
import { signIn } from "../auth"
import { AuthError } from "next-auth"
import { authUserMapper } from "../mappers/user-mapper"

/**
 * Function with the responsibility of validating the form data and call
 * gateway interface to create a new user
 * @param formData - Form data to create a new user
 * @returns - Errors if the form data is invalid, otherwise the new user
 */
function createUser(formData: FormData) {
  // Validate the form data
  const validatedFields = NewUserSchema.safeParse({
    name: formData.get('name'),
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
 
    // Call the API
    // TODO: Inject the abstract gateway to constructor
    const gateway = new UsersGateway()
    return gateway.new(newUser)
}

/**
 * Function with the responsibility of validating the form data and call
 * gateway interface to authenticate a user
 * @param formData - Form data to authenticate a user
 * @returns - Errors if the form data is invalid, otherwise the authenticated user
 */
async function authUser(formData: FormData) {
  try {
    const authUserDto = authUserMapper(formData);
    if('errors' in authUserDto) return authUserDto.errors;
    await signIn('credentials', authUserDto);
  } catch (error) {
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

export const UserActions =  {
  createUser,
  authUser
}