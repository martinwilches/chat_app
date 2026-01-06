import { LogOut } from 'lucide-react'
import { useAuthStore } from '../../stores/auth.store'
import { useQueryClient } from '@tanstack/react-query'
import { authService } from '../../services/auth.service'
import { useNavigate } from 'react-router'

const UserProfile: React.FC = () => {
    const { user, logout } = useAuthStore()
    const navigate = useNavigate()

    // instancia de `QueryClient`
    const queryClient = useQueryClient()

    const logoutUser = async () => {
        logout() // remover el usuario del store
        await authService.logout()
        await queryClient.removeQueries() // remover queries de la cache

        return navigate('/auth')
    }

    return (
        <div className="p-4 border-t border-gray-200 flex items-center justify-between space-x-3">
            <img
                src="https://avatar.iran.liara.run/public"
                alt="User"
                className="size-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
                <h2 className="font-semibold truncate text-sm">
                    {user?.fullName} ({user?.connectCode})
                </h2>
                <p className="text-xs text-gray-500">Online</p>
            </div>
            <button className="text-gray-600 cursor-pointer hover:text-gray-700">
                <LogOut className="size-5" onClick={() => logoutUser()} />
            </button>
        </div>
    )
}

export default UserProfile
