import { Navigate, Outlet } from 'react-router'

import { useAuth } from '../hooks/useAuth'

export function PrivateRoute() {
    const { data: user, isPending, error } = useAuth()

    if (isPending) return <div>Loading...</div>

    // si ocurrio un error o el usuario no esta autenticado, se redirecciona a la vista de autenticacion
    if (error || !user) return <Navigate to="/auth" />

    return <Outlet />
}

export function PublicRoute() {
    const { data: user, isPending } = useAuth()

    if (isPending) return <div>Loading...</div>

    // si el usuario se encuentra autenticado, por defecto se redirige a la ruta raiz de la aplicacion
    if (user) return <Navigate to="/" />

    return <Outlet />
}
