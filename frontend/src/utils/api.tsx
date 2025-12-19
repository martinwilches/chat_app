import axios from 'axios'

// instancia del cliente api
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000', // backend url
    withCredentials: true,
})

export default api
