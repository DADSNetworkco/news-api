const express = require("express")
const v1Router = express.Router()

const { getCategories, getPosts, getPost } = require("../Controller/V1Controller")
const { getPostsByCategoryId } = require("../Controller/PostController")

v1Router.get("/categories", getCategories)
v1Router.get("/posts", getPosts)
v1Router.get("/category/:cateId/posts", getPostsByCategoryId)
v1Router.get("/post/:postId", getPost)

module.exports = v1Router