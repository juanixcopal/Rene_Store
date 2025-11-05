import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  product: { type: String, required: true },
  gender: { type: String, required: true }
})

CategorySchema.index({ product: 1, gender: 1 }, { unique: true })

export default mongoose.model('Category', CategorySchema)
