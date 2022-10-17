const Review = require("../models/reviewModel");
const factory = require("./handleFactory");

exports.setTourUserIds = (req, res, next) => {
    // Allow nested router
    if (!req.body.nft) {
        req.body.nft = req.params.nftId;
    }
    if (!req.body.user) {
        req.body.user = req.user.id;
    }
    next();
};

exports.getAllReview = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
