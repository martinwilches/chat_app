import bcrypt from 'bcryptjs'

import generateConnectCode from '../utils/uniqueConnectCode.js'
import User from '../models/user.model.js'

class AuthController {
    static async register(req, res) {
        try {
            const [fullName, username, email, password] = req.body

            if (!fullName || !username || !email || !password) {
                return res.status(400).json({
                    message: 'All user fields are required',
                })
            }

            if (password.length < 6) {
                return res.status(400).json({
                    message: 'Password must be at least 6 characters',
                })
            }

            // validar que el usuario no se encuentre ya registrado
            const existingUser = await User.findOne({
                $or: [{ username }, { email }],
            })

            if (existingUser) {
                return res.status(409).json({
                    message: 'Username or email already taken',
                })
            }

            // encriptar la contraseña del usuario
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            const user = new User({
                fullName,
                username,
                email,
                password: hashPassword,
                connectCode: await generateConnectCode(),
            })

            // crear un nuevo usuario
            await user.save()

            return res.status(201).json({
                success: true,
                message: 'User created successfully!',
            })
        } catch (error) {
            console.error('User register error: ', error)

            return res.status(500).json({
                message: 'Internal server error',
            })
        }
    }
}

export default AuthController
