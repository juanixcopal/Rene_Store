export default function makeDashboardData({ Order }) {
  return Object.freeze({
    getDashboardStats,
    getLastOrders
  })

  async function getDashboardStats() {
    const orders = await Order.find()

    const totalOrders = orders.length

    let totalRevenue = 0
    let totalProducts = 0

    orders.forEach(order => {
      totalRevenue += order.total
      order.items.forEach(item => {
        totalProducts += item.quantity
      })
    })

    return {
      totalOrders,
      totalRevenue,
      totalProducts
    }
  }

  async function getLastOrders() {
    const lastOrders = await Order.find()
      .populate('user_id', 'user_name user_lastname')
      .sort({ createdAt: -1 })
      .limit(5)

    return lastOrders.map(order => ({
      id: order._id,
      customerName: `${order.user_id?.user_name || ''} ${
        order.user_id?.user_lastname || ''
      }`.trim(),
      totalProducts: order.items.reduce((sum, item) => sum + item.quantity, 0),
      // date: order.createdAt,
      date: new Date(order.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      totalPrice: order.total
    }))
  }
}
