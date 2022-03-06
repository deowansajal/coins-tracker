const filterUserCoins = (coins, userCoins) => {
    const newCoins = coins?.filter(coin => {
        if (userCoins?.includes(coin.id)) return coin
        return false
    })

    return newCoins
}

export default filterUserCoins
