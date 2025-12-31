import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// propiedades tipadas para la propiedad `user`
export type User = {
    id: string
    fullName: string
    username: string
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    setUser: (user: User) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                isAuthenticated: false,
                setUser: (user) => set({ user, isAuthenticated: true }),
                logout: () => set({ user: null, isAuthenticated: false }),
            }),
            {
                name: 'auth-store',
            }
        )
    )
)
