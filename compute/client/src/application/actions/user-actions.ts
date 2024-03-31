'use server'

import { NewUserDto } from "@/domain/dto/user.dto"
import { NewUserSchema } from "../validations/auth-validations"
import { UsersGateway } from "@/infrastructure/gateway/users.gateway"

 
export default async function createUser(formData: FormData) {
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
    const response = gateway.new(newUser)
}