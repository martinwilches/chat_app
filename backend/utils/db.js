import mongoose from 'mongoose'

export const connectDB = async () => {
    const uri = process.env.MONGO_URI // obtener la uri de MONGODB

    if (!uri) throw new Error('MongoDB URI is not defined')

    try {
        await mongoose.connect(uri, { dbName: 'chat_app' })

        console.log('Connected to MongoDB database succesfully!')
    } catch (error) {
        console.error('Error MongoDB connection: ', error)
        process.exit(1)
    }
}
