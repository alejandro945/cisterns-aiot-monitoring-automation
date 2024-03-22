
import { AuthUserDto, NewUserDto } from '@/domain/dto/user.dto'
import { ZodType, z } from 'zod'

export const AuthSchema = z.object({
    email: z.string().email("Correo Electrónico inválido"),
    password: z.string().min(1, 'Contraseña es requerida'),
}) satisfies ZodType<AuthUserDto>

export const NewUserSchema = z.object({
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
}) satisfies ZodType<NewUserDto>

export type AuthFormValues = z.infer<typeof AuthSchema>
export type NewUserFormValues = z.infer<typeof NewUserSchema>

