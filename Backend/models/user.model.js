import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  user_lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Rol', required: true }
})

export default mongoose.model('Users', UsersSchema)
