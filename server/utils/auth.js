const { ForbiddenError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const secret = process.env.JWT_SECRET
const expiration = '10h'

module.exports = {
    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id }
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
    },
    authMiddleware: async function ({ req }) {
        const token = req.headers.authorization?.split(' ')[1]
        const result = { user: null, isAuthenticated: false }
        if (!token) return result

        try {
            const decoded = jwt.verify(token, secret)
            const user = await User.findById(decoded.data?._id)
            if (!user) return result
            return { user, isAuthenticated: true }
        } catch (error) {
            return result
        }
    },
}
