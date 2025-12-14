import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'

import { connectDB } from './utils/db.js'

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
