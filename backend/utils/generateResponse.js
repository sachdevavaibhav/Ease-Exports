module.exports = (req, res, resObject) => {
    return {
        request: {
            type: req.method,
            status: res.statusCode
        },
        response: resObject
    }
}