import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// la aplicacion debe envolverse con el componente <BrowserRouter> para habilitar el enrutamiento
import { BrowserRouter } from 'react-router'

// `TanStack Query` permite manejar datos remotos (API's) de forma eficiente, sin usar `useState` ni `useEffect`
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// configurar el `QueryClient`
const queryClient = new QueryClient({
    defaultOptions: {
        queries: { // estas opciones por defecto solo afectan las consultas de lectura (useQuery)
            /**
             * Por defecto `TanStack` al cambiar de pestaña y luego volver a la app, vuelve a pedir los datos a la API
             * Con `refetchOnWindowFocus: false`, los datos se quedan en cache tal como estan, no se vuelve a consultar a la API
            */
            refetchOnWindowFocus: false
        }
    }
})

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    </QueryClientProvider>
)
