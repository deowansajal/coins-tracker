import React, { useState } from 'react'

import FormWrapper from '../FormWrapper'
import InputField from '../InputField'
import Button from '../Button'
import { useCoins } from '../../hooks/useCoins'

const AddCoin = () => {
    const [enteredNewCoin, setEnteredNewCoin] = useState('')
    const { addCoinSubmitHandler, errorMessage } = useCoins()

    const handleChange = event => setEnteredNewCoin(event.target.value)

    const handleFormSubmit = event => {
        event.preventDefault()
        addCoinSubmitHandler(enteredNewCoin)
    }

    return (
        <div className="mx-4">
            <FormWrapper>
                <div className="text-red-400">{errorMessage}</div>
                <h2 className="text-4xl mb-8 text-center font-medium">
                    Add New Coin
                </h2>
                <form onSubmit={handleFormSubmit}>
                    <InputField
                        placeholder="Add new coin"
                        name="addNewCoin"
                        value={enteredNewCoin}
                        onChange={handleChange}
                    />

                    <Button type="submit">Add Coin</Button>
                </form>
            </FormWrapper>
        </div>
    )
}

export default AddCoin
