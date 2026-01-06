import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// la aplicacion debe envolverse con el componente <BrowserRouter> para habilitar el enrutamiento
import { BrowserRouter } from 'react-router'

/**
* `QueryCliente` permite gestionar datos remotos (API's) de forma eficiente, sin usar `useState` ni `useEffect`
* `QueryCliente` es el administrador global de:
*     - cache de datos (reutiliza datos entre componentes)
*     - estados automaticos (isLoading, isError, data, isFetching)
*     - reintentos y refetch
*     - sincronizacion (si 2 componentes piden lo mismos, se hace una sola llamada y ambos reciben los datos)
*/
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// configurar el `QueryClient`
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // `false` los datos se quedan en cache tal como estan, no se vuelven a consultar a la API
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
