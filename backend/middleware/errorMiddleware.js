const errorHandler = (err, res, req, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message
    })
}

module.exports = { errorHandler }