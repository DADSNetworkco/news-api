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
    } catch (error) {
        console.log(error)
    }
}

const addCategory = async (req, res) => {
    try {
        const { id } = req
        const { category } = req.body
        const addCategory = await prisma.category.create({
            data: {
                title: category,
                authorId: id
            },
        })
        return res.status(200).json({
            success: true,
            message: "Added a new Category successfully!"
        })
    } catch (error) {}
}

module.exports = {
    getCategories,
    addCategory,
}
