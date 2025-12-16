import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import generateConnectCode from '../utils/uniqueConnectCode.js'
import User from '../models/user.model.js'

class AuthController {
    static async register(req, res) {
        try {
            const { fullName, username, email, password } = req.body

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

    static async login(req, res) {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res.status(400).json({
                    message: 'All user fields are required',
                })
            }

            // validar si el usuario se encuentra registrado
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({
                    message: 'User is not registered',
                })
            }

            // validar las credenciales de acceso
            const comparePassword = await bcrypt.compare(
                password,
                user.password
            )

            if (!comparePassword) {
                return res.status(403).json({
                    message: 'Invalid credentials',
                })
            }

            // generar token de autenticacion con duracion de 7 dias
            const token = jwt.sign(
                {
                    userId: user.id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '7d',
                }
            )

            // añadir a la response una cookie cuyo nombre es `jwt` y su valor el token generado
            res.cookie('jwt', token, {
                maxAge: 7 * 24 * 60 * 60 * 1000, // expiracion de la cookie `7 dias`
                httpOnly: true, // la cookie no podra ser accedida por el cliente JavaScript
                secure: process.env.NODE_ENV !== 'development', // en entorno de produccion, la cookie solo se enviara a traves de conexion https
            })

            return res.json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    fullName: user.fullName,
                    connectCode: user.connectCode,
                },
            })
        } catch (error) {
            console.error('User login error: ', error)

            return res.status(500).json({
                message: 'Internal server error',
            })
        }
    }
}

export default AuthController
