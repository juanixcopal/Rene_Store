import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
})

CartSchema.index({ user_id: 1, product_id: 1 }, { unique: true })

export default mongoose.model('Cart', CartSchema)
