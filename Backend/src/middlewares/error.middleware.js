export default (error, request, response, next) => {
  const httpStatus = error.status || 500

  return response.status(httpStatus).send({
    type: 'about:blank',
    message: 'Internal server error',
    status: httpStatus,
    detail: error.message
  })
}
