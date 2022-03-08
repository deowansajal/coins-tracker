import React, { useState } from 'react'

import Button from '../Button'
import FormWrapper from '../FormWrapper'

import Coin from '../../utils/coin'
import { useCoins } from '../../hooks/useCoins'
import ToastMessage from '../ToastMessage'
import { useUtils } from '../../hooks/useUtils'
import AutoComplete from '../Autocomplete'

const UpdateCoin = () => {
    const [enteredNewCoin, setEnteredNewCoin] = useState(Coin.getCurrentCoin())

    const { updateCoinSubmitHandler, errorMessage, setErrorMessage, coins } =
        useCoins()

    const {
        filteredSuggestions,
        setFilteredSuggestions,
        activeSuggestionIndex,
        setActiveSuggestionIndex,
        showSuggestions,
        setShowSuggestions,
    } = useUtils()

    const handleChange = event => setEnteredNewCoin(event.target.value)

    const handleFormSubmit = async event => {
        event.preventDefault()
        updateCoinSubmitHandler(enteredNewCoin)
    }

    const isSubmitButtonShown =
        !showSuggestions ||
        enteredNewCoin?.length === 0 ||
        filteredSuggestions.length === 0
    return (
        <div className="mx-4">
            <FormWrapper>
                <ToastMessage
                    type="error"
                    message={errorMessage}
                    setMessage={setErrorMessage}
                />
                <h2 className="text-4xl mb-8 text-center font-medium">
                    Update Coin
                </h2>
                <form onSubmit={handleFormSubmit}>
                    <AutoComplete
                        input={enteredNewCoin}
                        setInput={setEnteredNewCoin}
                        suggestions={coins?.map(coin => coin.id)}
                        filteredSuggestions={filteredSuggestions}
                        setFilteredSuggestions={setFilteredSuggestions}
                        activeSuggestionIndex={activeSuggestionIndex}
                        setActiveSuggestionIndex={setActiveSuggestionIndex}
                        showSuggestions={showSuggestions}
                        setShowSuggestions={setShowSuggestions}
                    />
                    {isSubmitButtonShown && (
                        <Button type="submit">Update Coin</Button>
                    )}
                </form>
            </FormWrapper>
        </div>
    )
}

export default UpdateCoin
