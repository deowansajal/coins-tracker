const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const path = require('path')
require('dotenv').config()
const CoinGeckoClient = require('coingecko-api')

const { typeDefs, resolvers } = require('./schemas')
const { authMiddleware } = require('./utils/auth')
const db = require('./config/connection')

const PORT = process.env.PORT || 3001
const app = express()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // These two lines below enable the playground when deployed to heroku. You can remove them if you don't want this functionality
    introspection: true,
    playground: true,
    context: authMiddleware,
})

server.applyMiddleware({ app })

const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
})
// const runCoinGecko = async () => {
//     const trendingSearch = await client.trendingSearch()
//     return {
//         trendingSearch,
//     }
// }

let coins = []

// client.coins.markets().then(({ data }) => {
//     console.log(data)
//     data.forEach(coin => {
//         coins.push({
//             id: coin.id,
//             name: coin.name,

//             symbol: coin.symbol,
//             current_price: coin.current_price,
//             market_cap: coin.market_cap,
//             total_volume: coin.total_volume,
//         })
//     })
//     console.log(coins.length, coins)
// })
// client.trending().then(value => {
//     value.coins.forEach(coin => {
//         coins.push(coin.item)
//     })
//     console.log(coins)
// })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
        console.log(
            `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
        )
    })
})
