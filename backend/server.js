import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'

import { connectDB } from './utils/db.js'
import authRouter from './routes/auth.routes.js'

dotenv.config()

const app = express()
const httpServer = http.createServer(app)

app.use(
    cors({
        // habilitar CORS para recibir peticiones desde el lado del front
        origin: process.env.CLIENT_ORIGIN,
        credentials: true,
    })
)

app.use(cookieParser())
app.use(express.json()) // acceder a los datos enviados a traves de req.body

// routes
app.use('/api/auth', authRouter)

try {
    await connectDB()

    const PORT = process.env.PORT || 4000

    httpServer.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })
} catch (error) {
    console.log('The server failed to start: ', error)
    process.exit(1)
}
