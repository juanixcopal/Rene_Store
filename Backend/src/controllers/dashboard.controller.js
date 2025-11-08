export default ({ dashboardServices }) => {
  return async ({ request, moduleKey }) => {
    try {
      if (dashboardServices[moduleKey]) {
        const resultService = await dashboardServices[moduleKey]({
          request
        })

        const { status } = resultService

        return {
          status: status || 200,
          body: resultService
        }
      } else {
        return {
          status: 400,
          body: {
            type: 'about:blank',
            message: 'Internal Server Error',
            status: 400,
            detail: 'Service not found'
          }
        }
      }
    } catch (error) {
      return null
    }
  }
}
