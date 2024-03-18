
import { AuthenticateUserDto, CreateUserDto } from '@/dto/out/user-out-dto'
import { ZodType, z } from 'zod'

export const AuthenticateUserSchema = z.object({
    email: z.string({
        invalid_type_error: 'Invalid Email',
        required_error: 'Email is required',
    }).email(),
    password: z.string({
        invalid_type_error: 'Invalid Password',
        required_error: 'Password is required',
    }).min(1),
}) satisfies ZodType<AuthenticateUserDto>

export const CreateUserSchema = z.object({
    name: z.string({
        invalid_type_error: 'Invalid Name',
        required_error: 'Name is required',
    }),
    email: z.string({
        invalid_type_error: 'Invalid Email',
        required_error: 'Email is required',
    }).email(),
    password: z.string({
        invalid_type_error: 'Invalid Password',
        required_error: 'Password is required',
    }),
    confirmPassword: z.string({
        invalid_type_error: 'Invalid Confirm Password',
        required_error: 'Confirm Password is required',
    }).refine((data) => data === (this as any)?.password, {
        message: 'Passwords do not match',
    }),
}) satisfies ZodType<CreateUserDto>

export type AuthenticateFormValues = z.infer<typeof AuthenticateUserSchema>
export type CreateFormValues = z.infer<typeof CreateUserSchema>

