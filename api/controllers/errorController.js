const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const message = `Invalid input data: ${
        err.errors.name ||
        err.errors.duration ||
        err.errors.maxGroupSize ||
        err.errors.difficulty ||
        err.errors.ratingsAverage ||
        err.errors.price ||
        err.errors.priceDiscount ||
        err.errors.summary ||
        err.errors.imageCover
    }`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.keyValue.name;
    const message = `Duplicate field value: ${value}. Please use another value`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith("/api")) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
    console.error("ERROR: ", err);
};

const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith("/api")) {
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }

        console.error("ERROR: ", err);
        return res.status(500).json({
            status: "error",
            message: "Something went wrong!",
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = { ...err };
        if (error.name === "CastError") error = handleCastErrorDB(error);
        if (error.name === "ValidationError") error = handleValidationErrorDB(error);
        if (error.name === "MongoError" && error.code === 11000)
            error = handleDuplicateFieldsDB(error);
        sendErrorProd(error, req, res);
    }
};
