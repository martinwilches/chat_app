import { useState } from 'react'

import { Mail } from 'lucide-react'
import LoginForm from './partials/LoginForm'
import RegisterForm from './partials/RegisterForm'

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false)

    return (
        <>
            <div className="min-h-screen w-full bg-white flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 bg-sky-500 p-8 text-white flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 p-4 rounded-full">
                                <Mail className="size-10" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome to the chat app
                        </h1>
                        <p>
                            Connect with friends and family, anytime and
                            everywhere
                        </p>
                    </div>
                    <div className="mt-10 text-center">
                        <p className="text-sm opacity-80">
                            Join thousands of users today
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex p-8 justify-center items-center">
                    {isLogin ? (
                        <div className="w-full md:w-100">
                            <LoginForm onSwitch={() => setIsLogin(true)} />
                        </div>
                    ) : (
                        <div className="w-full md:w-100">
                            <RegisterForm onSwitch={() => setIsLogin(false)} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Auth
