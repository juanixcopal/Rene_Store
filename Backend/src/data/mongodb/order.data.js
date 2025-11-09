export default function makeOrderData({ Order }) {
  return Object.freeze({ findByUser })

  async function findByUser(id) {
    return Order.find({ user_id: id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'items.product_id',
        select: 'name price image category_id',
        populate: {
          path: 'category_id',
          select: 'product gender'
        }
      })
  }
}
