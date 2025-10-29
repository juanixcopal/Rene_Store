export default async ({ request, response, moduleKey, controller }) => {
  const httpResponse = await controller({ request, moduleKey })

  if (httpResponse) {
    const { status, body } = httpResponse
    if (status === 409 || status === 404 || status === 400) {
      response.setHeader('Content-Type', 'application/problem+json')
    } else {
      response.setHeader('Content-Type', 'application/json')
    }
    response.status(status)
    response.send(body)
  } else {
    response.status(500)
    response.setHeader('Content-Type', 'application/problem+json')
    response.send({
      type: 'about:blank',
      message: 'Internal Server Error',
      status: 500,
      detail: 'An internal server error ocurred'
    })
  }
}
