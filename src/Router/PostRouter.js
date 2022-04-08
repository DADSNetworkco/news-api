const express = require("express")
const authMiddleware = require("../Middleware/AuthMiddleware")

const postRouter = express.Router()

const multer = require("multer")
//cấu hình lưu trữ file khi upload xong
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //files khi upload xong sẽ nằm trong thư mục "upload" này - các bạn có thể tự định nghĩa thư mục này
        cb(null, "upload")
    },
    filename: function (req, file, cb) {
        // tạo tên file = thời gian hiện tại nối với số ngẫu nhiên => tên file chắc chắn không bị trùng
        const filename = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, `${filename}-${file.originalname}`)
    },
})
//Khởi tạo middleware với cấu hình trên, lưu trên local của server khi dùng multer
const upload = multer({ storage })

const { getPosts, addPost, getPost } = require("../Controller/PostController")

// Admin 
postRouter.get("/", authMiddleware, getPosts)
postRouter.get("/:postId", authMiddleware, getPost)
postRouter.post("/", [authMiddleware, upload.single("thumb")], addPost)

module.exports = postRouter
