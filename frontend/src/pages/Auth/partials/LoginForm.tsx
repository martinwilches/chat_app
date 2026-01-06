import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Loader, LockIcon, Mail } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { authService } from '../../../services/auth.service'
import { useAuthStore } from '../../../stores/auth.store'

// prop utilizada por el componente para alternar la vista entre el formulario de login y registro
interface LoginFormProps {
    onSwitch: () => void
}

const loginSchema = z.object({
    email: z.email({ message: 'Email is invalid' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
})

type LoginFormData = z.infer<typeof loginSchema>

// `<LoginFormProps>` indica que el componente debe recibir las props definidas en la interfaz
const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
    const navigate = useNavigate()
    const store = useAuthStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    })

    const { mutate, isPending } = useMutation({
        mutationFn: authService.login,
        onSuccess: (response) => {
            toast.success('Log in successfully!')
            store.setUser(response.user)
            return navigate('/')
        },
        onError: (error) => {
            const errorMsg =
                error.response?.data?.message ||
                'An error occurred during authentication process'
            toast.error(errorMsg)
        },
    })

    const onsubmit = (data: LoginFormData) => mutate(data)

    return (
        <>
            <h2 className="text-2xl font-bold text-dark mb-2">
                Sign In into your account
            </h2>
            <p className="text-gray-500 text-sm mb-8">Join our community</p>

            <form onSubmit={handleSubmit(onsubmit)}>
                <div className="mb-2">
                    <label htmlFor="email">Email</label>
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
                    <label htmlFor="password">Password</label>
                    <div className="relative">
                        <LockIcon className="icon-input-form" />
                        <input
                            {...register('password')}
                            className="input-form"
                            type="password"
                            placeholder="******"
                        />
                    </div>
                    {errors.password && (
                        <span className="text-xs text-red-500">
                            {errors.password.message}
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
                        'Sign In'
                    )}
                </button>
            </form>

            <div className="text-center text-sm mt-4">
                <span>
                    Don't have an account?{' '}
                    <span
                        className="text-sky-500 font-medium cursor-pointer hover:underline"
                        onClick={onSwitch}
                    >
                        Sign Up
                    </span>
                </span>
            </div>
        </>
    )
}

export default LoginForm
