const express = require("express")
const authMiddleware = require("../Middleware/AuthMiddleware")

const categoryRouter = express.Router()

const { getCategories, addCategory } = require("../Controller/CategoryController")

categoryRouter.get("/", authMiddleware, getCategories)
categoryRouter.post("/", authMiddleware, addCategory)

module.exports = categoryRouter
