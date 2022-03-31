const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = await req.headers.authorization
        if (!authHeader) return res.status(403).json(isNotPermission)
        const accessToken = await authHeader.split(" ")[1]
        if (!accessToken) return res.status(403).json(isNotPermission)
        const decoded = jwt.verify(accessToken, process.env.SECRET)
        
        if (!decoded) return res.status(403).json(isNotPermission)
        
        req.id = decoded.id
        return next()
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }
}

const isNotPermission = {
    success: false,
    message: "Access denied. You have no permission...",
}

app.use(authMiddleware)

module.exports = authMiddleware
