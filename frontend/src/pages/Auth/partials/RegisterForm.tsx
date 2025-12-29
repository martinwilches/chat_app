import { authService } from '../../../services/auth.service'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { KeyRound, Loader, Mail, User } from 'lucide-react'

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    })

    const { mutate, isPending } = useMutation({
        mutationFn: authService.register, // funcion para el registro de usuarios
        onSuccess: () => {
            onSwitch()
            toast.success('Account created successfully!')
        },
        onError: (error) => {
            const errorMsg =
                error.response?.data?.message ||
                'An error ocurred during registration process'
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
                <div className="mb-2">
                    <label htmlFor="fullName" className="label-form">
                        Full name
                    </label>
                    <div className="relative">
                        <User className="icon-input-form" />
                        <input
                            {...register('fullName')}
                            className="input-form"
                            placeholder="John Doe"
                            autoComplete="off"
                        />
                    </div>
                    {errors.fullName && (
                        <span className="text-xs text-red-500">
                            {errors.fullName.message}
                        </span>
                    )}
                </div>

                <div className="mb-2">
                    <label htmlFor="username" className="label-form">
                        Username
                    </label>
                    <div className="relative">
                        <User className="icon-input-form" />
                        <input
                            {...register('username')}
                            className="input-form"
                            placeholder="johndoe"
                            autoComplete="off"
                        />
                    </div>
                    {errors.username && (
                        <span className="text-xs text-red-500">
                            {errors.username.message}
                        </span>
                    )}
                </div>

                <div className="mb-2">
                    <label htmlFor="email" className="label-form">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="icon-input-form" />
                        <input
                            {...register('email')}
                            className="input-form"
                            placeholder="johndoe@example.com"
                            autoComplete="off"
                            type="email"
                        />
                    </div>
                    {errors.email && (
                        <span className="text-xs text-red-500">
                            {errors.email.message}
                        </span>
                    )}
                </div>

                <div className="mb-2">
                    <label htmlFor="password" className="label-form">
                        Password
                    </label>
                    <div className="relative">
                        <KeyRound className="icon-input-form" />
                        <input
                            {...register('password')}
                            className="input-form"
                            placeholder="******"
                            autoComplete="off"
                            type="password"
                        />
                    </div>
                    {errors.password && (
                        <span className="text-xs text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                </div>

                <div className="mb-2">
                    <label htmlFor="confirmPassword" className="label-form">
                        Confirm password
                    </label>
                    <div className="relative">
                        <KeyRound className="icon-input-form" />
                        <input
                            {...register('confirmPassword')}
                            className="input-form"
                            placeholder="******"
                            autoComplete="off"
                            type="password"
                        />
                    </div>
                    {errors.confirmPassword && (
                        <span className="text-xs text-red-500">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="form-submit-btn"
                >
                    {isPending ? (
                        <Loader className="animate-spin size-5" />
                    ) : (
                        'Register'
                    )}
                </button>
            </form>

            <div className="text-center text-sm mt-4">
                <span className="text-gray-600">
                    Already have an account?{' '}
                    <span
                        onClick={onSwitch}
                        className="text-sky-500 font-medium cursor-pointer hover:underline"
                    >
                        Sign In
                    </span>
                </span>
            </div>
        </>
    )
}

export default RegisterForm
