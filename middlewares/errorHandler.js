function errorHandler(err, req, res, next) {
    let code = 500;
    let message = ["Internal server error"];

    switch (err.name) {
        case "SequelizeValidationError":
            code = 400;
            message = err.errors.map((el) => {
                return el.message;
            });
            return res.status(code).json({ message })
        case 'Not Found':
            code = 404;
            message = err.message;
            return res.status(code).json({ message })
        default:
            return res.status(code).json({ message })
    }


}

module.exports = errorHandler