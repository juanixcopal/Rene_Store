export default (request, response, next) => {
  const service = request.headers['service']
  if (!service) {
    response.status(400)
    response.setHeader('Content-Type', 'application/problem+json')
    response.send({
      type: 'about:blank',
      message: 'Unspecified service',
      status: 400,
      detail: 'The service has not been specified in the header'
    })
  } else {
    next()
  }
}
