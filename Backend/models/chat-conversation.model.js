import mongoose from 'mongoose'

const ConversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }],
    lastMessage: {
      text: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
      createdAt: Date
    }
  },
  { timestamps: true }
)

ConversationSchema.index({ participants: 1 })

export default mongoose.model('Conversation', ConversationSchema)
