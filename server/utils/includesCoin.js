const includesCoin = (coin, coins) => {
    const lowercaseCoin = coin?.trim()?.toLowerCase()
    const isIncludes = coins?.includes(lowercaseCoin)
    return isIncludes
}

module.exports = includesCoin
