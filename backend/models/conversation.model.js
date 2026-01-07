import mongoose from 'mongoose'
const { Schema } = mongoose

const conversationSchema = new Schema(
    {
        // array para guardar el id del requester y del recipient
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        ],
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
        lastMessagePreview: {
            message: String, // contenido del mensaje
            timestamp: Date, // fecha envio/recepcion del mensaje
        },
        unreadCounts: {
            type: Map, // objeto cuyos valores son de tipo Number
            of: Number,
            default: {},
        },
    },
    { timestamps: true }
)

conversationSchema.index(
    { 'participants.0': 1, 'participants.1': 1 },
    { unique: true } // garantizar que no exista mas de una conversacion entre el mismo par de usuarios
)

conversationSchema.pre('save', function (next) {
    if (this.participants && this.participants.length == 2) {
        // antes de guardar los participantes de la conversacion, ordenarlos alfabeticamente eg, [A,B] en lugar de [B,A]
        this.participants = this.participants.map((p) => p.toString()).sort()
    }

    next()
})

export default mongoose.model('Conversation', conversationSchema)
