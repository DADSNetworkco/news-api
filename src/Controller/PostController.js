const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            include: {
                category: true,
                user: {
                    select: { name: true },
                },
            },
        })
        console.log(posts)
        return res.status(200).json({
            success: true,
            data: posts,
        })
    } catch (error) {}
}

const getPost = async (req, res) => {
    try {
        const posts = await prisma.post.findFirst({
            where: { published: true },
        })
        return res.status(200).json({
            success: true,
            data: posts,
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
        console.log({ title, content })
        const post = await prisma.post.create({
            data: {
                title,
                content,
                thumbnail: `${process.env.BASE_URL}/upload/${file.filename}`,
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

module.exports = {
    getPosts,
    getPost,
    addPost,
}
