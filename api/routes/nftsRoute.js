const express = require("express");
const router = express.Router();
const nftControllers = require("../controllers/nftControllers");
const authControllers = require("../controllers/authControllers");
const reviewRouter = require("../routes/reviewsRoute");

router.use("/:nftId/reviews", reviewRouter);

router.route("/nft-stats").get(nftControllers.getNFTStats);

router
    .route("/monthly-plan/:year")
    .get(
        authControllers.protect,
        authControllers.restrictTo("admin"),
        nftControllers.getMonthlyPlan
    );

router.route("/top-5-nfts").get(nftControllers.aliasTopNFTs, nftControllers.getAllNfts);

router
    .route("/")
    .get(nftControllers.getAllNfts)
    .post(authControllers.protect, authControllers.restrictTo("user"), nftControllers.createNft);

router
    .route("/:id")
    .get(nftControllers.getOneNft)
    .patch(authControllers.protect, authControllers.restrictTo("user"), nftControllers.updateNft)
    .delete(authControllers.protect, authControllers.restrictTo("user"), nftControllers.deleteNft);

module.exports = router;
