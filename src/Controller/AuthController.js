const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const signUpController = async (req, res) => {
    try {
        const { email, password, confirmPassword, name } = req.body
        console.log({ email, password, confirmPassword, name })

        if (!email || !password || !confirmPassword || !name) return res.status(403)

        if (password !== confirmPassword) return res.status(403)
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        })
        return res.status(200).json({
            success: true,
            message:
                "Create account successfully! Please check your email to verify account then re-login.",
        })
    } catch (error) {
        console.log(error)
    }
}

const signInController = async (req, res) => {
    try {
        const { email, password, remember_me } = req.body

        if (!email || !password) return res.status(403)
        const user = await prisma.user.findUnique({
            where: { email },
        })
        if (!user)
            return res.status(401).json({
                success: false,
                message: "Email is not existed!",
            })
        const verifiedPassword = await bcrypt.compare(password, user.password)
        if (!verifiedPassword)
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            })
        if (user.role !== "ADMIN")
            return res.status(403).json({
                success: false,
                message: "You have no permission",
            })
        const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.SECRET,
            { expiresIn: "1m" }
        )
        const refreshToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.SECRET,
            { expiresIn: "1w" }
        )
        return res.status(200).json({
            success: true,
            message: `You successfully login by ${user.name}`,
            accessToken,
            refreshToken,
        })
    } catch (error) {
        console.log(error)
    }
}

const signOutController = async (req, res) => {
    const { id, email, name, role } = req.body
    return res.status(200).json({
        success: true,
        message: "Sign out successfully!"
    })
}
module.exports = {
    signUpController,
    signInController,
    signOutController,
}
