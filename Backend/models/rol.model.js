import mongoose from 'mongoose'

const RolSchema = new mongoose.Schema({
  rol: { type: String, required: true, unique: true }
})

export default mongoose.model('Rol', RolSchema)
