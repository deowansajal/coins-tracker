import React, { useState } from 'react'

import FormWrapper from '../FormWrapper'
import Button from '../Button'
import { useCoins } from '../../hooks/useCoins'
import { useUtils } from '../../hooks/useUtils'
import ToastMessage from '../ToastMessage'
import AutoComplete from '../Autocomplete'

const AddCoin = () => {
    const [enteredNewCoin, setEnteredNewCoin] = useState('')
    const { addCoinSubmitHandler, errorMessage, setErrorMessage, coins } =
        useCoins()
    const {
        filteredSuggestions,
        setFilteredSuggestions,
        activeSuggestionIndex,
        setActiveSuggestionIndex,
        showSuggestions,
        setShowSuggestions,
    } = useUtils()

    const handleFormSubmit = event => {
        event.preventDefault()
        addCoinSubmitHandler(enteredNewCoin)
    }

    const isSubmitButtonShown =
        !showSuggestions ||
        enteredNewCoin?.length === 0 ||
        filteredSuggestions.length === 0
    return (
        <div className="mx-4">
            <FormWrapper>
                <div className="w-full">
                    <ToastMessage
                        type="error"
                        message={errorMessage}
                        setMessage={setErrorMessage}
                    />
                    <h2 className="text-4xl mb-8 text-center font-medium">
                        Add New Coin
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
                            <Button type="submit">Add Coin</Button>
                        )}
                    </form>
                </div>
            </FormWrapper>
        </div>
    )
}

export default AddCoin
