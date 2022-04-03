const express = require("express")
const authRouter = express.Router()

const authMiddleware = require("../Middleware/AuthMiddleware")
const { signUpController, signInController, signOutController } = require("../Controller/AuthController")

authRouter.post("/signup", signUpController)
authRouter.post("/signin", signInController)
authRouter.get("/signout", authMiddleware, signOutController)

module.exports = authRouter