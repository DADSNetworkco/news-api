const express = require("express")
const cors = require("cors")
require("dotenv").config({ path: ".env.local" })
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Static file uploaded
app.use("/upload", express.static("upload"))

const PORT = process.env.PORT

const AuthRouter = require("./Router/AuthRouter")
const UserRouter = require("./Router/UserRouter")
const CategoryRouter = require("./Router/CategoryRouter")
const PostRouter = require("./Router/PostRouter")

const V1Router = require("./Router/V1Router")

// endpoint
app.use("/auth", AuthRouter)
app.use("/user", UserRouter)
app.use("/content/category", CategoryRouter)
app.use("/content/post", PostRouter)

// public api
app.use("/v1", V1Router)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
