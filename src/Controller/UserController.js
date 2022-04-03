const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const getUserController = async (req, res) => {
    const id = req.id
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, name: true, role: true },
        })
        return res.json({
            success: true,
            data: user,
        })
    } catch (error) {}
}

module.exports = {
    getUserController,
}
