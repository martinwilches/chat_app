import { authService } from '../../../services/auth.service'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { KeyRound, Mail, User } from 'lucide-react'

interface RegisterFormProps {
    onSwitch: () => void
}

/**
 * esquema de validacion de datos para el registro de usuarios
 * - por defecto todas las propiedades son requeridas
 */
const registerSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(2, { message: 'Full name is too short' }),
        username: z
            .string()
            .regex(/^[a-z0-9_]+$/, {
                message:
                    'Username only can contain lowercase letters, numbers or underscore',
            })
            .min(3, { message: 'Username must be at least 3 characters long' })
            .max(30, { message: 'Username is too long' })
            .lowercase(),
        email: z.email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' })
            .max(15, { message: 'Password is too long' }),
        confirmPassword: z.string(),
    })
    // .refine() permite realizar una validacion personalizada
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'], // la validacion se aplicara al campo `confirmPassword`
    })

type RegisterFormData = z.infer<typeof registerSchema>

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitch }) => {
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(registerSchema),
    })

    const { mutate, isPending } = useMutation({
        mutationFn: authService.register, // funcion para el registro de usuarios
        onSuccess: () => {
            onSwitch()
            toast.success('Registered successfully')
        },
        onError: (error) => {
            const errorMsg =
                error.response?.data?.message || 'Registration failed'
            toast.error(errorMsg)
        },
    })

    const onSubmit = (data: RegisterFormData) => mutate(data) // invocar a la funcion mutate, pasando la data del usuario como parametro

    // formulario de registro
    return (
        <>
            <h2 className="text-2xl font-bold text-dark mb-2">
                Create your account
            </h2>
            <p className="text-gray-500 text-sm mb-8">Join our community</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label
                        htmlFor="fullName"
                        className="block text-gray-700 mb-2 text-sm"
                    >
                        Full name
                    </label>
                    <div className="relative mb-2">
                        <User className="absolute inset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2" />
                        <input
                            {...register('fullName')}
                            className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="John Doe"
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="username"
                        className="block text-gray-700 mb-2 text-sm"
                    >
                        Username
                    </label>
                    <div className="relative mb-2">
                        <User className="absolute inset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2" />
                        <input
                            {...register('username')}
                            className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="johndoe"
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-gray-700 mb-2 text-sm"
                    >
                        Email
                    </label>
                    <div className="relative mb-2">
                        <Mail className="absolute inset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2" />
                        <input
                            {...register('email')}
                            className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="johndoe@example.com"
                            autoComplete="off"
                            type="email"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-gray-700 mb-2 text-sm"
                    >
                        Password
                    </label>
                    <div className="relative mb-2">
                        <KeyRound className="absolute inset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2" />
                        <input
                            {...register('password')}
                            className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="******"
                            autoComplete="off"
                            type="password"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-gray-700 mb-2 text-sm"
                    >
                        Confirm password
                    </label>
                    <div className="relative mb-2">
                        <KeyRound className="absolute inset-y-0 left-3 size-5 text-gray-400 top-1/2 -translate-y-1/2" />
                        <input
                            {...register('confirmPassword')}
                            className="text-sm w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="******"
                            autoComplete="off"
                            type="password"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-sky-500 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex justify-center items-center hover:bg-sky-600 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <Loader className="animate-spin size-5" />
                    ) : (
                        'Register'
                    )}
                </button>
            </form>
        </>
    )
}

export default RegisterForm
