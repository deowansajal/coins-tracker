const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Coin {
        coin: String!
    }

    type Coins {
        coins: [Coin]
    }

    type Query {
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addCoin(coin: String!): Coins
        updateCoin(coin: String!, newCoin: String!): Coin
        removeCoin(coin: String!): Coin
    }
`

module.exports = typeDefs
