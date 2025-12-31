import { Navigate, Outlet } from 'react-router'

import { useAuthStore } from '../stores/auth.store'

export function PrivateRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />
}

export function PublicRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    return !isAuthenticated ? <Outlet /> : <Navigate to="/" />
}
