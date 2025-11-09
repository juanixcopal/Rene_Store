export default ({ chatServices }) => {
  return async ({ request, moduleKey }) => {
    try {
      if (chatServices[moduleKey]) {
        const resultService = await chatServices[moduleKey]({
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
