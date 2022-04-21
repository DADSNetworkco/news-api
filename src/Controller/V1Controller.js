const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            where: { published: true },
        })
        return res.status(200).json({
            success: true,
            data: categories,
        })
    } catch (error) {}
}

const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            select: {
                id: true,
                title: true,
                content: true,
                thumbnail: true,
                createdAt: true,
            },
        })
        return res.status(200).json({
            success: true,
            data: posts,
        })
    } catch (error) {}
}

const getPost = async (req, res) => {
    try {
        const { postId } = req.params
        const post = await prisma.post.findFirst({
            where: { id: parseInt(postId), published: true },
            select: {
                id: true,
                title: true,
                content: true,
                thumbnail: true,
                createdAt: true,
            },
        })
        return res.status(200).json({
            success: true,
            data: post,
        })
    } catch (error) {}
}

module.exports = {
    getCategories,
    getPosts,
    getPost,
}
