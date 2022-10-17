const NFT = require("../models/nftModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handleFactory");

exports.getAllNfts = factory.getAll(NFT);

exports.getOneNft = factory.getOne(NFT, { path: "reviews" });

exports.createNft = factory.createOne(NFT);

exports.updateNft = factory.updateOne(NFT);

exports.deleteNft = factory.deleteOne(NFT);

exports.aliasTopNFTs = async (req, res, next) => {
    req.query.limit = "5";
    req.query.sort = "-ratingsAverage, price";
    req.query.fields = "name,price,ratingsAverage,difficulty";
    next();
};

exports.getNFTStats = catchAsync(async (req, res, next) => {
    const stats = await NFT.aggregate([
        {
            $match: { ratingsAverage: { $gte: 4.5 } },
        },
        {
            $group: {
                _id: { $toUpper: "$difficulty" },
                num: { $sum: 1 },
                numRatings: { $sum: "$ratingsQuantity" },
                avgRating: { $avg: "$ratingsAverage" },
                avgPrice: { $avg: "$price" },
                minPrice: { $min: "$price" },
                maxPrice: { $max: "$price" },
            },
        },
        {
            $sort: { avgRating: 1 },
        },
        // {
        //     $match: { _id: { $ne: "EASY" } },
        // },
    ]);

    res.status(200).json({
        status: "success",
        data: stats,
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1;
    const plan = await NFT.aggregate([
        {
            $unwind: "$startDates",
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: { $month: "$startDates" },
                nftsQuantity: { $sum: 1 },
                nftsName: { $push: "$name" },
            },
        },
        {
            $addFields: {
                month: "$_id",
            },
        },
        {
            $project: {
                _id: 0,
            },
        },
        {
            $sort: {
                month: 1,
            },
        },
        {
            $limit: 12,
        },
    ]);

    res.status(200).json({
        status: "success",
        data: plan,
    });
});
