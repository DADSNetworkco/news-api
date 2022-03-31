const express = require("express")
const cors = require("cors")
require("dotenv").config()
const app = express()

app.use(express.json())
app.use(cors())


const PORT = process.env.PORT
const authRouter = require("./Router/AuthRouter")
const userRouter = require("./Router/UserRouter")
const CategoryRouter = require("./Router/CategoryRouter")
const PostRouter = require("./Router/PostRouter")

// endpoint
app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/category", CategoryRouter)
app.use("/post", PostRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
