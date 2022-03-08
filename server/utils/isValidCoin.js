const { COIN_LIST } = require('../utils/coinList')

const isValidCoin = coin =>
    COIN_LIST.map(coin => coin.toLowerCase()).includes(coin?.toLowerCase())

module.exports = isValidCoin
