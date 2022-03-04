const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Coin {
        coin: String!
    }

    type Coins {
        coins: [Coin]
    }

    type User {
        _id: ID
        username: String
        email: String
        coins: Coins
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addCoin(coin: String!): Coin
        updateCoin(coin: String!, newCoin: String!): Coin
        removeCoin(coin: String!): Coin
    }
`

module.exports = typeDefs
