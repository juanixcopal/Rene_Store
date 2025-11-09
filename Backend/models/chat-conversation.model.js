import mongoose from 'mongoose'

const ConversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }],
    // opcional: título, tipo (soporte), meta, etc.
    lastMessage: {
      text: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
      createdAt: Date
    }
  },
  { timestamps: true }
)

ConversationSchema.index({ participants: 1 }) // para consultas por participante

export default mongoose.model('Conversation', ConversationSchema)
