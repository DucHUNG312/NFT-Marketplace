const mongoose = require("mongoose");
const validator = require("validator");
const { default: slugify } = require("slugify");

const nftSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A NFT must have a name"],
            unique: true,
            trim: true,
            maxlength: [40, "NFT name can't exceed 40 characters"],
            minlength: [10, "NFT name can't shorter than 10 characters"],
        },
        slug: String,
        duration: {
            type: Number,
            required: [true, "must have a duration"],
        },
        maxGroupSize: {
            type: Number,
            required: [true, "must have group size"],
        },
        difficulty: {
            type: String,
            required: [true, "must have difficulty"],
            enum: {
                values: ["easy", "medium", "difficult"],
                message: "Difficulty is either easy, medium and difficult",
            },
        },
        ratingsAverage: {
            type: Number,
            default: 1,
            min: [1, "ratingsAverage can't below 1"],
            max: [5, "ratingsAverage can't exceed 5"],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 4.5,
        },
        price: {
            type: Number,
            required: [true, "A NFT must have price"],
        },
        priceDiscount: {
            type: Number,
            // this only point to current doc on NEW document creation
            validate: {
                validator: function (val) {
                    return val < this.price;
                },
                message: "Discount price ({VALUE}) can't exceeds the actual price",
            },
        },
        summary: {
            type: String,
            trim: true,
            required: [true, "must provide summary"],
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            required: [true, "must provide the cover image"],
        },
        images: {
            type: [String],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
        },
        startDates: {
            type: [Date],
        },
        secretNfts: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            require: [true, "NFT must belong to an user"],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

nftSchema.index({ user: 1 }, { unique: true });

nftSchema.virtual("durationWeeks").get(function () {
    return this.duration / 7;
});

nftSchema.virtual("reviews", {
    ref: "Review",
    foreignField: "nft",
    localField: "_id",
});

// Document middleware: runs before save() or create()
nftSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

nftSchema.pre("save", function (next) {
    console.log("Doc saving...");
    next();
});

nftSchema.post("save", function (doc, next) {
    console.log(doc);
    next();
});

// Query middleware
nftSchema.pre(/^find/, function (next) {
    this.find({ secretNfts: { $ne: true } });
    this.start = Date.now();
    next();
});

nftSchema.post(/^find/, function (doc, next) {
    console.log(`Time querying: ${Date.now() - this.start}`);
    console.log(doc);
    next();
});

// Aggreation middleware
nftSchema.pre("aggregate", function (next) {
    // using unshift to add an element to the head of the pipeline array
    this.pipeline().unshift({ $match: { secretNfts: { $ne: true } } });
    next();
});

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;
