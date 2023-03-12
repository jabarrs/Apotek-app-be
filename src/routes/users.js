const express = require("express")
const router = express.Router()
const usersController = require("../controllers/users")
const {authAccessToken} = require("../middlewares/auth")

router
    .post("/register", usersController.register)
    .post("/login", usersController.login)
    .post("/refresh-token", usersController.refreshToken)
    .get("/list", authAccessToken, usersController.listUsers)
    .get("/verify/:userId/:token", usersController.verifyUser)
    .post("/forgot-password", usersController.forgotPassword)
    // .get("/reset-password/:userId/:token", userController.confirmResetPassword)
    // .post("/reset-password", userController.resetPassword);
    // .patch("/change-password", userController.changePassword)
    // .delete("/logout", usersController.logout)
    // .get("/profile", authAccessToken, usersController.profile)

module.exports = router