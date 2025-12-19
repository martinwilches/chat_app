import api from '../utils/api'

// conjunto de peticiones para la autenticacion dentro de un objeto `authService`
export const authService = {
    login: async (data: { email: string; password: string }) => {
        const response = await api.post('/auth/login', data)
        return response.data
    },
    register: async (data: {
        fullName: string
        username: string
        password: string
        email: string
    }) => {
        const response = await api.post('/auth/register', data)
        return response.data
    },
    user: async () => {
        const response = await api.get('/auth/user')
        return response.data
    },
    logout: async () => {
        await api.post('/auth/logout')
    },
}
