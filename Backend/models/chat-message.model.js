import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
  {
    conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    sender_role: { type: String }, // "Administrador" o "Usuario"
    content: { type: String, default: '' },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }] // quien leyó
  },
  {
    timestamps: true
  }
)

// índice para buscar mensajes no leídos por conversation
MessageSchema.index({ conversation_id: 1, createdAt: 1 })

export default mongoose.model('Message', MessageSchema)
