import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import FormWrapper from '../FormWrapper'
import InputField from '../InputField'
import Button from '../Button'
import { useCoins } from '../../hooks/useCoins'
import ToastMessage from '../ToastMessage'

import theme from './theme.module.css'

const AutosuggestInput = ({ values }) => {
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const coins = values?.map(coin => coin.id)

    console.log({ coins })

    const getSuggestionValue = suggestion => suggestion
    const renderSuggestion = suggestion => <div>{suggestion}</div>
    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length

        return inputLength === 0
            ? []
            : coins.filter(
                  coin =>
                      coin.toLowerCase().slice(0, inputLength) === inputValue
              )
    }

    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    }

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value))
    }

    const onChange = (event, { newValue }) => {
        setValue(newValue)
    }

    const inputProps = {
        placeholder: 'Type a programming language',
        value,
        onChange,
    }

    return (
        <Autosuggest
            theme={theme}
            highlightFirstSuggestion={true}
            renderInputComponent={props => {
                return (
                    <input
                        {...props}
                        className="border py-2 px-4 w-full mb-6 rounded-full focus:outline-none focus:border-cyan-700"
                        placeholder="Search name"
                        name="searchName"
                    />
                )
            }}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    )
}

const AddCoin = () => {
    const [enteredNewCoin, setEnteredNewCoin] = useState('')
    const { addCoinSubmitHandler, errorMessage, setErrorMessage, coins } =
        useCoins()

    const handleChange = event => setEnteredNewCoin(event.target.value)

    const handleFormSubmit = event => {
        event.preventDefault()
        addCoinSubmitHandler(enteredNewCoin)
    }

    return (
        <div className="mx-4">
            <FormWrapper>
                <ToastMessage
                    type="error"
                    message={errorMessage}
                    setMessage={setErrorMessage}
                />
                <h2 className="text-4xl mb-8 text-center font-medium">
                    Add New Coin
                </h2>
                <form onSubmit={handleFormSubmit}>
                    {/* <InputField
                        placeholder="Add new coin"
                        name="addNewCoin"
                        value={enteredNewCoin}
                        onChange={handleChange}
                    /> */}

                    <AutosuggestInput values={coins} />
                    <Button type="submit">Add Coin</Button>
                </form>
            </FormWrapper>
        </div>
    )
}

export default AddCoin
