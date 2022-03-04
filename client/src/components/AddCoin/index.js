import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useUtils } from '../../hooks/useUtils'
import { ADD_COIN } from '../../utils/mutations'
import Button from '../Button'
import FormWrapper from '../FormWrapper'
import InputField from '../InputField'

const AddCoin = () => {
    const [enteredNewCoin, setEnteredNewCoin] = useState('')

    const { closeCoinModal } = useUtils()

    const [addCoin, { data }] = useMutation(ADD_COIN)

    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = event => setEnteredNewCoin(event.target.value)

    const handleFormSubmit = async event => {
        event.preventDefault()
        try {
            const { data } = await addCoin({
                variables: { coin: enteredNewCoin },
            })
            closeCoinModal()
        } catch (e) {
            setErrorMessage(e.message)
            console.error(e)
        }
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
