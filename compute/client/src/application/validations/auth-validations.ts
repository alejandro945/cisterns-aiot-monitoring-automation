
import { AuthUserDto, NewUserDto } from '@/domain/dto/user.dto'
import { ZodType, z } from 'zod'

export const AuthSchema = z.object({
    email: z.string().email("Correo Electrónico inválido"),
    password: z.string().min(1, 'Contraseña es requerida'),
}) satisfies ZodType<AuthUserDto>

export const NewUserSchema = z.object({
    name: z.string().min(1, 'Nombre es requerido'),
    email: z.string().email('Correo Electrónico inválido'),
    password: z.string().min(6, 'Contraseña es requerida o minimo 6 caracteres').max(20, 'Contraseña no puede ser mayor a 20 caracteres'),
    confirmPassword: z.string().min(6, 'Confirmar Contraseña es requerida o minimo 6 caracteres').max(20, 'Confirmar Contraseña no puede ser mayor a 20 caracteres'),
}).refine((data: any) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
}) satisfies ZodType<NewUserDto>

export type AuthFormValues = z.infer<typeof AuthSchema>
export type NewUserFormValues = z.infer<typeof NewUserSchema>

