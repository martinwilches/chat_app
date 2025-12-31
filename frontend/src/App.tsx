import { Route, Routes } from 'react-router'
import Auth from './pages/Auth/Auth'
import Chat from './pages/Chat/Chat'

import { Toaster } from 'sonner'
import { PrivateRoute, PublicRoute } from './pages/PageGuards'

// React.FC -> Componente de React
const App: React.FC = () => {
    return (
        <>
            {/* Routes -> contenedor para la definicion de las rutas */}
            <Routes>
                {/* ruta protegida para otorgar acceso unicamente a usuarios autenticados */}
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Chat />}></Route>
                </Route>
                <Route element={<PublicRoute />}>
                    <Route path="/auth" element={<Auth />}></Route>
                </Route>
            </Routes>
            <Toaster richColors position="top-right" />
        </>
    )
}

export default App
