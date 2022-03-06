export const API = {
    getCoins: async () => {
        const coins = await fetch('https://api.coincap.io/v2/assets', {
            'Access-Control-Allow-Origin': '*',
        })
        const data = await coins.json()
        return data
    },
}
