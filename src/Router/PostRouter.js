const express = require("express")
const multer = require("multer")
const authMiddleware = require("../Middleware/AuthMiddleware")

const postRouter = express.Router()

//cấu hình lưu trữ file khi upload xong
const storageThumb = multer.diskStorage({
    destination: function (req, file, cb) {
        //files khi upload xong sẽ nằm trong thư mục "upload" này - các bạn có thể tự định nghĩa thư mục này
        cb(null, "upload/thumbnail")
    },
    filename: function (req, file, cb) {
        // tạo tên file = thời gian hiện tại nối với số ngẫu nhiên => tên file chắc chắn không bị trùng
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        cb(null, `${filename}-${file.originalname}`)
    },
})
//Khởi tạo middleware với cấu hình trên, lưu trên local của server khi dùng multer
const uploadThumb = multer({ storage: storageThumb, limits: { fileSize: 1024 * 1024 } })

const {
    getPosts,
    addPost,
    getPost,
    publishPost,
    deletePost,
} = require("../Controller/PostController")

// Admin
postRouter.get("/", authMiddleware, getPosts)
postRouter.get("/:postId", authMiddleware, getPost)
postRouter.post("/publish", authMiddleware, publishPost)
postRouter.delete("/", authMiddleware, deletePost)
postRouter.post("/", [authMiddleware, uploadThumb.single("thumb")], addPost)

// Public API

module.exports = postRouter
