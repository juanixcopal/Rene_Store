export default (_, response) => {
    response.status(404)
    response.setHeader('Content-Type', 'application/problem+json')
    response.send({
        type: 'about:blank',
        message: 'Not Found',
        status: 404,
        detail: 'The requested URL was not found on this API',
    })
}
