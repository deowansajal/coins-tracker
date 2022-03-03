const {
    AuthenticationError,
    ForbiddenError,
    UserInputError,
} = require('apollo-server-express')
const { User } = require('../models')
const { signToken } = require('../utils/auth')
const { COIN_LIST } = require('../utils/coinList')

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('thoughts')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('thoughts')
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

        addCoin: async (parent, { coin }, context) => {
            const user = await User.findById(context.user?._id)

            if (!user) {
                throw new ForbiddenError('Unauthorized!')
            }

            if (
                user.coins?.includes(coin) ||
                !COIN_LIST.some(existCoin => existCoin[0] === coin)
            ) {
                throw new UserInputError(
                    `${coin} already has taken! or invalid coin `
                )
            }

            user.coins.push(coin)

            const result = await user.save({ validate: false })

            return { coins: [{ coin }], result }
        },

        updateCoin: async (parent, { coin, newCoin }, context) => {
            const user = await User.findOne({
                _id: context.user?._id,
                coins: coin,
            })

            if (!user) throw new ForbiddenError('Unauthorized!')

            if (!COIN_LIST.some(existCoin => existCoin[0] === newCoin))
                throw new UserInputError('or invalid coin')

            const index = user.coins.findIndex(existCoin => existCoin === coin)
            user.coins.set(index, newCoin)
            await user.save({ validate: false })

            return { coin: newCoin }
        },

        removeCoin: async (parent, { coin }, context) => {
            const user = await User.findOne({
                _id: context.user?._id,
                coins: coin,
            })

            if (!user) throw new ForbiddenError('Unauthorized!')

            const index = user.coins.findIndex(existCoin => existCoin === coin)
            user.coins.splice(index, 1)
            await user.save({ validate: false })

            return { coin }
        },
    },
}

module.exports = resolvers
