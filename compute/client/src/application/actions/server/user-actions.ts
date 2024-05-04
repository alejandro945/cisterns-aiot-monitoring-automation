'use server'

import { NewUserDto } from "@/domain/dto/user.dto"
import { NewUserSchema } from "../../validations/auth-validations"
import { UsersGateway } from "@/infrastructure/gateway/users.gateway"
import { User } from "@/domain/model/User"

/**
 * Function with the responsibility of validating the form data and call
 * gateway interface to create a new user
 * @param formData - Form data to create a new user
 * @returns - Errors if the form data is invalid, otherwise the new user
 */
export async function createUser(prevState: any, formData: FormData) {

  // Validate the form data
  const validatedFields = NewUserSchema.safeParse({
    name: formData?.get('name'),
    email: formData?.get('email'),
    password: formData?.get('password'),
    confirmPassword: formData?.get('confirmPassword'),
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Create a new user object
  const newUser: NewUserDto = {
    name: formData?.get('name') as string,
    email: formData?.get('email') as string,
    password: formData?.get('password') as string,
    confirmPassword: formData?.get('confirmPassword') as string,
  }

  // Call the API
  // TODO: Inject the abstract gateway to constructor
  const gateway = new UsersGateway()
  return await gateway.new(newUser) as User
}