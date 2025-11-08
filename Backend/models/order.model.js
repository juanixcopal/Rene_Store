import mongoose from 'mongoose'

const OrderItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String },
  gender: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  subtotal: { type: Number, required: true }
})

const OrderSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    items: [OrderItemSchema],
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export default mongoose.model('Order', OrderSchema)
