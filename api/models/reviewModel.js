const mongoose = require("mongoose");
const NFT = require("./nftModel");

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            trim: true,
            required: [true, "Review cannot be empty"],
        },
        rating: {
            type: Number,
            default: 4.5,
            min: [1, "Rating must be above 1.0"],
            max: [5, "Rating must be below 5.0"],
        },
        createAt: {
            type: Date,
            default: Date.now(),
        },
        nft: {
            type: mongoose.Schema.ObjectId,
            ref: "NFT",
            require: [true, "Review must belong to a nft"],
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            require: [true, "Review must belong to an user"],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name photo",
    });
    next();
});

reviewSchema.index({ nft: 1, user: 1 }, { unique: true });

// static
reviewSchema.statics.calcAverageRatings = async function (nftId) {
    const stats = await this.aggregate([
        {
            $match: { nft: nftId },
        },
        {
            $group: {
                _id: "$nft",
                nRating: { $sum: 1 },
                avgRating: { $avg: "$rating" },
            },
        },
    ]);
    if (stats.length > 0) {
        await NFT.findByIdAndUpdate(nftId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating,
        });
    } else {
        await NFT.findByIdAndUpdate(nftId, {
            ratingsQuantity: 0,
            ratingsAverage: 1,
        });
    }
};

// Caculate rating quantity and rating average when create new review
reviewSchema.post("save", function () {
    // this point to current review
    this.constructor.calcAverageRatings(this.nft);
});

// Caculate rating quantity and rating average when delete and update review
reviewSchema.pre(/^findOneAnd/, async function (next) {
    // this here does not point to current review but current query
    this.r = await this.findOne();
    next();
});

reviewSchema.post(/^findOneAnd/, async function () {
    // we must use calcAverageRatings() after data is inserted to the collection,
    // but at this time we also cannot using findOne() bc the query is already executed
    // then we must pass "r" to this query (this.r) enable to use it in the next middleware
    await this.r.constructor.calcAverageRatings(this.r.nft);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
