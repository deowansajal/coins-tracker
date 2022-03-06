const {
    AuthenticationError,
    ForbiddenError,
    UserInputError,
} = require('apollo-server-express')
const { User } = require('../models')
const { signToken } = require('../utils/auth')
const { COIN_LIST } = require('../utils/coinList')

const isValidCoin = coin =>
    COIN_LIST.map(coin => coin.toLowerCase()).includes(coin?.toLowerCase())

const isCoinIncludes = (coin, coins) => {
    const lowercaseCoin = coin?.trim()?.toLowerCase()
    console.log({ lowercaseCoin })
    const isIncludes = coins?.includes(lowercaseCoin)
    console.log({ isIncludes })
    return isIncludes
}

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('thoughts')
        },
        user: async (parent, data, { user, isAuthenticated }) => {
            if (!isAuthenticated) throw new ForbiddenError('Unauthorized!')
            await User.findById(user._id)
            console.log('user', user)
            return user
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

            const lowercaseCoin = coin?.toLowerCase()

            if (user.coins?.includes(lowercaseCoin)) {
                throw new UserInputError(`${lowercaseCoin} already has taken!`)
            }

            if (!isValidCoin(lowercaseCoin)) {
                throw new UserInputError(`${lowercaseCoin} is not valid coin!`)
            }

            user.coins.push(lowercaseCoin)

            const result = await user.save({ validate: false })

            return { coin: lowercaseCoin }
        },

        updateCoin: async (
            parent,
            { coin, newCoin },
            { user, isAuthenticated }
        ) => {
            if (!isAuthenticated) throw new ForbiddenError('Unauthorized!')

            if (!isCoinIncludes(coin, user.coins)) {
                throw new UserInputError(`${coin} doesn't exist`)
            }
            if (isCoinIncludes(newCoin, user.coins)) {
                throw new UserInputError(`${coin} already has taken!`)
            }

            if (!isValidCoin(newCoin)) {
                throw new UserInputError(`${coin} is not valid coin!`)
            }

            const index = user.coins?.findIndex(
                _coin => _coin === coin?.toLowerCase()
            )

            if (index === -1 || typeof index === undefined) {
                throw new UserInputError("coin doesn't exist")
            }

            user.coins.set(index, newCoin)
            await user.save({ validate: false })

            return { coin: newCoin }
        },

        removeCoin: async (parent, { coin }, { user, isAuthenticated }) => {
            if (!isAuthenticated) throw new ForbiddenError('Unauthorized!')

            const index = user.coins?.findIndex(
                _coin => _coin === coin?.toLowerCase()
            )

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
