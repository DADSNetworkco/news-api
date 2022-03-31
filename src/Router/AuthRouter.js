const express = require("express")
const authRouter = express.Router()

const { signUpController, signInController } = require("../Controller/AuthController")

authRouter.post("/signup", signUpController)
authRouter.post("/signin", signInController)

module.exports = authRouter