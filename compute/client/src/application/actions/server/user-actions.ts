'use server'

import { signIn } from "@/application/auth"
import { createUserMapper } from "@/application/mappers/user-mapper"
import { newUser } from "@/infrastructure/gateway/users.gateway"

/**
 * Function with the responsibility of validating the form data and call
 * gateway interface to create a new user
 * @param formData - Form data to create a new user
 * @returns - Errors if the form data is invalid, otherwise the new user
 */
export async function createUser(prevState: any, formData: FormData) {
  // Create a new user object
  const NewUserDto = createUserMapper(formData)

  if ('errors' in NewUserDto) {
    return NewUserDto
  }

  // Call the API
  const result = await newUser(NewUserDto) as any
  if (!result) {
    return { errors: { email: ['Email already in use'] } }
  }

  // Sign in the user
  try {
    await signIn('credentials', {email: result._doc.email, password: formData.get('password'), redirectTo: '/dashboard'})
  }catch (error) {
    throw error;
  }
}