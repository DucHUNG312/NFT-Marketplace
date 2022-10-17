const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handleFactory");

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    });
    return newObj;
};

// For user
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirmed) {
        return next(new AppError("This route is not for update password", 400));
    }

    const filterBody = filterObj(req.body, "name", "email");

    const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: {
            user: updateUser,
        },
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: "success",
        data: null,
    });
});

// For admin
exports.createUser = factory.createOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
exports.getOneUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
