const express = require("express")
const authMiddleware = require('../Middleware/AuthMiddleware')

const userRouter = express.Router()

const { getUserController } = require("../Controller/UserController")

userRouter.get("/info", authMiddleware, getUserController)

module.exports = userRouter