const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                category: true,
                user: {
                    select: { name: true },
                },
            },
        })
        return res.status(200).json({
            success: true,
            data: posts,
        })
    } catch (error) {}
}

const getPost = async (req, res) => {
    const { postId } = req.params
    try {
        const post = await prisma.post.findFirst({
            where: { id: parseInt(postId) },
            include: {
                category: true,
            },
        })
        return res.status(200).json({
            success: true,
            data: post,
        })
    } catch (error) {}
}

const addPost = async (req, res) => {
    try {
        const { data } = req.body
        const parseData = await JSON.parse(data)
        const { title, content, categoryId } = parseData
        const { file, id } = req
        if (!file) return res.status(400)

        const post = await prisma.post.create({
            data: {
                title,
                content,
                thumbnail: `${process.env.BASE_URL}/upload/thumbnail/${file.filename}`,
                categoryId,
                authorId: id,
            },
        })
        return res.status(200).json({
            success: true,
            message: "Create new Post successfully!",
        })
    } catch (error) {}
}

const updatePost = async (req, res) => {
    const { postId } = req.params
    try {
        const { data } = req.body
        const parseData = await JSON.parse(data)
        const { title, content, categoryId } = parseData
        const { file, id } = req
        if (!file) {
            await prisma.post.update({
                where: {
                    id: parseInt(postId),
                },
                data: {
                    title,
                    content,
                    categoryId,
                    authorId: id,
                },
            })
        } else {
            await prisma.post.update({
                where: {
                    id: parseInt(postId),
                },
                data: {
                    title,
                    content,
                    thumbnail: `${process.env.BASE_URL}/upload/thumbnail/${file.filename}`,
                    categoryId,
                    authorId: id,
                },
            })
        }

        return res.status(200).json({
            success: true,
            message: "Update Post successfully!",
        })
    } catch (error) {}
}

const publishPost = async (req, res) => {
    try {
        const { id, status } = req.body
        const publishPost = await prisma.post.update({
            where: { id },
            data: {
                published: status === "published" ? false : true,
            },
        })
        return res.status(200).json({
            success: true,
            message: `Successfully ${status === "published" ? "unpublish" : "publish"} post!`,
        })
    } catch (error) {}
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.body
        const deletePost = await prisma.post.delete({
            where: { id },
        })
        return res.status(200).json({
            success: true,
            message: "Successfully deleted post!",
        })
    } catch (error) {}
}

module.exports = {
    getPosts,
    getPost,
    addPost,
    updatePost,
    publishPost,
    deletePost,
}
