const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please tell us your name"],
        maxlength: [40, "User name can't exceed 40 characters"],
        minlength: [8, "User name can't shorter than 10 characters"],
    },
    email: {
        type: String,
        require: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        email: ["user", "admin"],
        default: "user",
    },
    password: {
        type: String,
        require: [true, "Please provide a password"],
        minlength: 8,
        select: false,
    },
    passwordConfirmed: {
        type: String,
        require: [true, "An user must have a confirmed password"],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: "Password are not the same!",
        },
    },
    passwordChangedAt: {
        type: Date,
        default: 0,
        select: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirmed = undefined;
    next();
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimeStamp;
    }

    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
