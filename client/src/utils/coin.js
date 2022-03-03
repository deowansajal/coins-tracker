class CoinService {
    setCurrentCoin(currentCoin) {
        localStorage.setItem('current_coin', currentCoin)
    }

    getCurrentCoin() {
        return localStorage.getItem('current_coin')
    }
}

export default new CoinService()
