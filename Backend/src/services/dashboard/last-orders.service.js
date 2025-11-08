export default ({ dashboardData }) => {
  return async () => {
    try {
      const lastOrders = await dashboardData.getLastOrders()

      return lastOrders
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al obtener los últimos pedidos'
      }
    }
  }
}
