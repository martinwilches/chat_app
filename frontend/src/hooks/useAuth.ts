import { useQuery } from '@tanstack/react-query'
import { authService } from '../services/auth.service'

export function useAuth() {
    // hook `useQuery` utilizado para obtener y cachear datos obtenidos del servidor
    return useQuery({
        queryKey: ['auth'],
        queryFn: authService.user,
        retry: false // las peticiones fallidas no se reintentan por defecto
    })
}
