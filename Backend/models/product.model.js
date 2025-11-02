import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
})

export default mongoose.model('Product', ProductSchema)
