import { validationResult } from 'express-validator'
export default (request, response, next) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    response.status(400)
    response.setHeader('Content-Type', 'application/problem+json')
    response.send({
      type: 'about:blank',
      message: 'Fields missing',
      status: 400,
      detail: errors.array()
    })
  } else {
    next()
  }
}
