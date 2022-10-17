const express = require("express");
const reviewsController = require("../controllers/reviewsController");
const authControllers = require("../controllers/authControllers");

const router = express.Router({ mergeParams: true });

router.use(authControllers.protect);

router
    .route("/")
    .get(reviewsController.getAllReview)
    .post(
        authControllers.restrictTo("user"),
        reviewsController.setTourUserIds,
        reviewsController.createReview
    );

router
    .route("/:id")
    .get(reviewsController.getReview)
    .patch(authControllers.restrictTo("user", "admin"), reviewsController.updateReview)
    .delete(authControllers.restrictTo("user", "admin"), reviewsController.deleteReview);

module.exports = router;
