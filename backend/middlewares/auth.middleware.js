import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'

// obtener la informacion del usuario autenticado
const authMiddleware = (req, res, next) => {
    const errorMessage = 'Unauthorized'

    try {
        const token = res.cookies.jwt

        if (!token) {
            return res.status(401).json({
                message: errorMessage,
            })
        }

        // decodificar el token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        // obtener la informacion del usuario a partir del id utilizado en el payload al crear el token
        req.user = User.findById(decodedToken.userId).select('-password')

        next()
    } catch (error) {
        res.status(401).json({
            message: errorMessage,
        })
    }
}

export default authMiddleware
