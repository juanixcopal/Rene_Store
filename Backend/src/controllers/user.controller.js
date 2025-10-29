export default ({ userServices, helpersObject }) => {
  return async ({ request, moduleKey }) => {
    try {
      if (userServices[moduleKey]) {
        const resultService = await userServices[moduleKey]({
          request,
          helpersObject
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
