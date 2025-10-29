export default (request, response, next) => {
  if (!request.user || request.user.rol !== 'Administrador') {
    response.status(403)
    response.setHeader('Content-Type', 'application/problem+json')
    response.send({
      type: 'about:blank',
      message: 'You do not have permission to perform this action.',
      status: 403,
      detail: 'This action is restricted to users with the Administrador role.'
    })
  } else {
    next()
  }
}
