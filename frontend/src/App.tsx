import { Route, Routes } from 'react-router'
import Auth from './pages/Auth/Auth'
import Chat from './pages/Chat/Chat'

import { Toaster } from 'sonner'

// React.FC -> Componente de React
const App: React.FC = () => {
    return (
        <>
            {/* Routes -> contenerdor para la definicion de las rutas */}
            <Routes>
                <Route path="/" element={<Chat />}></Route>
                <Route path="/auth" element={<Auth />}></Route>
            </Routes>
            <Toaster />
        </>
    )
}

export default App
