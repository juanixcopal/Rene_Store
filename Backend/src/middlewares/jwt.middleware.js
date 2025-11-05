import jwt from 'jsonwebtoken'

export default (request, response, next) => {
  const token = request.headers['token']

  if (!token) {
    response.status(401)
    response.setHeader('Content-Type', 'application/problem+json')
    return response.send({
      type: 'about:blank',
      message: 'Token is required',
      status: 401,
      detail: 'You must provide a valid token in the request header.'
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      response.status(401)
      response.setHeader('Content-Type', 'application/problem+json')
      return response.send({
        type: 'about:blank',
        message: 'Your session has expired',
        status: 401,
        detail: err.message
      })
    }

    request.user = decodedToken
    next()
  })
}
