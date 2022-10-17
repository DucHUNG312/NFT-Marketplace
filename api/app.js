const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const nftsRouter = require("./routes/nftsRoute");
const usersRouter = require("./routes/usersRoute");
const reviewsRouter = require("./routes/reviewsRoute");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// Serving statuc files
app.use(express.static(path.join(__dirname, "public")));

// GLOBAL MIDDLEWARES

// Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Limit 100 request on 1 hour from an IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
// Parse the data from form
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// Parse the data from cookie
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
    hpp({
        whitelist: [
            "duration",
            "ratingsAverage",
            "ratingsQuantity",
            "maxGroupSize",
            "difficulty",
            "price",
        ],
    })
);

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    //console.log(req.cookies);
    next();
});

app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/reviews", reviewsRouter);

app.use("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
