const express = require("express")
const cors = require("cors")
require("dotenv").config({ path: ".env.local" })
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Static file
app.use("/upload", express.static("upload"))

const PORT = process.env.PORT
const authRouter = require("./Router/AuthRouter")
const userRouter = require("./Router/UserRouter")
const CategoryRouter = require("./Router/CategoryRouter")
const PostRouter = require("./Router/PostRouter")

// endpoint
app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/content/category", CategoryRouter)
app.use("/content/post", PostRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
