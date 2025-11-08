export default ({ dashboardData }) => {
  return async () => {
    try {
      const stats = await dashboardData.getDashboardStats()

      return stats
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        result: false,
        message: 'Ocurrió un error al obtener las estadísticas del panel'
      }
    }
  }
}
