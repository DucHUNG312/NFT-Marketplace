const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");
const authControllers = require("../controllers/authControllers");

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);
router.post("/logout", authControllers.logout);
router.post("/forgotPassword", authControllers.forgotPassword);
router.post("/resetPassword/:token", authControllers.resetPassword);

// protected routes
router.use(authControllers.protect);

router.get("/me", userControllers.getMe, userControllers.getOneUser);
router.patch("/updatePassword", authControllers.updatePassword);
router.patch("/updateMe", userControllers.updateMe);
router.delete("/deleteMe", userControllers.deleteMe);

// restricted routes
router.use(authControllers.restrictTo("admin"));

router.route("/").get(userControllers.getAllUsers).post(userControllers.createUser);
router
    .route("/:id")
    .get(userControllers.getOneUser)
    .patch(userControllers.updateUser)
    .delete(userControllers.deleteUser);

module.exports = router;
