export default function makeOrderData({ Order }) {
  return Object.freeze({ findByUser, findAll })

  async function findByUser(id) {
    const orders = await Order.find({ user_id: id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'items.product_id',
        select: 'name price image category_id',
        populate: {
          path: 'category_id',
          select: 'product gender'
        }
      })
      .lean()

    return orders.map(order => {
      const date = new Date(order.createdAt)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()

      return {
        ...order,
        createdAt: `${day}/${month}/${year}`
      }
    })
  }

  async function findAll() {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'user_id',
        select: 'user_name user_lastname'
      })
      .populate({
        path: 'items.product_id',
        select: 'name price image category_id',
        populate: {
          path: 'category_id',
          select: 'product gender'
        }
      })
      .lean()

    return orders.map(order => {
      const date = new Date(order.createdAt)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()

      return {
        ...order,
        createdAt: `${day}/${month}/${year}`,
        user_name: order.user_id?.user_name || '',
        user_lastname: order.user_id?.user_lastname || ''
      }
    })
  }
}
