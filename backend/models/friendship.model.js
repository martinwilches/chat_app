import mongoose from 'mongoose'
const { Schema } = mongoose

const friendShipSchema = new Schema(
    {
        requester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
    },
    { timestamps: true }
)

// relacion unica entre 2 usuarios
friendShipSchema.index({ requester: 1, recipient: 1 }, { unique: true })

export default mongoose.model('Friendship', friendShipSchema)
