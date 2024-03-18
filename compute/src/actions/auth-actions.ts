'use server'

import { CreateUserDto } from "@/dto/out/user-out-dto"
import { AuthService } from "@/services/auth-service"
import { CreateUserSchema } from "@/validations/auth-validations"

 
export default async function createUser(formData: FormData) {
  const validatedFields = CreateUserSchema.safeParse({
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
  const newUser: CreateUserDto = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }
 
    // Call the API
    AuthService.createUser(newUser)
}