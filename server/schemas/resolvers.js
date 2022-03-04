const {
    AuthenticationError,
    ForbiddenError,
    UserInputError,
} = require('apollo-server-express')
const { User } = require('../models')
const { signToken } = require('../utils/auth')
const { COIN_LIST } = require('../utils/coinList')

const isValidCoin = coin => COIN_LIST.some(existCoin => existCoin[0] === coin)

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('thoughts')
        },
        user: async (parent, data, { user, isAuthenticated }) => {
            if (!isAuthenticated) throw new ForbiddenError('Unauthorized!')
            return User.findById(user._id)
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            try {
                const user = await User.create({ username, email, password })
                const token = signToken(user)
                return { token, user }
            } catch (error) {
                throw new Error('User Creation fail!')
            }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError(
                    'No user found with this email address'
                )
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user)

            return { token, user }
        },

        addCoin: async (parent, { coin }, { user, isAuthenticated }) => {
            if (!isAuthenticated) throw new ForbiddenError('Unauthorized!')

            if (user.coins?.includes(coin) || !isValidCoin(coin)) {
                throw new UserInputError(
                    `${coin} already has taken! or invalid coin`
                )
            }

            user.coins.push(coin)

            const result = await user.save({ validate: false })

            return { coin }
        },

        updateCoin: async (
            parent,
            { coin, newCoin },
            { user, isAuthenticated }
        ) => {
            if (!isAuthenticated) throw new ForbiddenError('Unauthorized!')

            if (
                !user.coins?.includes(coin) ||
                user.coins?.includes(newCoin) ||
                !isValidCoin(newCoin)
            ) {
                throw new UserInputError(
                    "coin doesn't  or newCoin already  exist"
                )
            }

            const index = user.coins?.findIndex(_coin => _coin === coin)

            if (index === -1 || typeof index === undefined) {
                throw new UserInputError("coin doesn't exist")
            }

            user.coins.set(index, newCoin)
            await user.save({ validate: false })

            return { coin: newCoin }
        },

        removeCoin: async (parent, { coin }, { user, isAuthenticated }) => {
            if (!isAuthenticated) throw new ForbiddenError('Unauthorized!')

            const index = user.coins?.findIndex(_coin => _coin === coin)

            if (index === -1 || typeof index === undefined) {
                throw new UserInputError("coin doesn't exist")
            }

            user.coins.splice(index, 1)
            await user.save({ validate: false })

            return { coin }
        },
    },
}

module.exports = resolvers
