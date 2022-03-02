import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../utils/mutations'

import InputField from '../InputField'

import Auth from '../../utils/auth'

import Button from '../Button'
import { useUtils } from '../../hooks/useUtils'
import FormWrapper from '../FormWrapper'

const Login = props => {
    const [formState, setFormState] = useState({ email: '', password: '' })
    const { setIsLoginMode } = useUtils()
    const [login, { error, data }] = useMutation(LOGIN_USER)

    const handleChange = event => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value,
        })
    }

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault()
        console.log(formState)
        try {
            const { data } = await login({
                variables: { ...formState },
            })

            Auth.login(data.login.token)
            setFormState({
                email: '',
                password: '',
            })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="mx-4">
            <FormWrapper>
                <div className="text-center text-red-400">
                    {error && error.message}
                </div>
                <h2 className="text-4xl mb-8 text-center font-medium">Login</h2>
                <form onSubmit={handleFormSubmit}>
                    <InputField
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <InputField
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <Button type="submit">Submit</Button>
                </form>

                <div className="text-sm mt-5 mx-3 text-right ">
                    <span>Don't have an Account Yet ?</span>
                    <span
                        onClick={() => setIsLoginMode(false)}
                        className="font-medium cursor-pointer text-cyan-500 ml-2"
                    >
                        (Signup)
                    </span>
                </div>
            </FormWrapper>
        </div>
    )
}

export default Login
