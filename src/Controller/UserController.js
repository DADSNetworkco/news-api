const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const getUserController = async (req, res) => {
    const id = req.id
    console.log(id)
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, name: true, role: true },
        })
        return res.json({
            message: true,
            data: user,
        })
    } catch (error) {}
}

module.exports = {
    getUserController,
}
