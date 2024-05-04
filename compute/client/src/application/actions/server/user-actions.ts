'use server'

import { createUserMapper } from "@/application/mappers/user-mapper"
import { UsersGateway } from "@/infrastructure/gateway/users.gateway"
import { User } from "next-auth"

/**
 * Function with the responsibility of validating the form data and call
 * gateway interface to create a new user
 * @param formData - Form data to create a new user
 * @returns - Errors if the form data is invalid, otherwise the new user
 */
export async function createUser(prevState: any, formData: FormData) {
  // Create a new user object
  const newUser = createUserMapper(formData)

  if ('errors' in newUser) {
    return newUser
  }
  // Call the API
  // TODO: Inject the abstract gateway to constructor
  const gateway = new UsersGateway()
  return await gateway.new(newUser) as User
}