import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'

import InputField from '../components/Inputs'

import Auth from '../utils/auth'

import Button from '../components/Button'
const FormWrapper = ({ children }) => {
    return (
        <div className="max-w-md p-10 mt-20 mx-auto border rounded-xl shadow-lg bg-white">
            {children}
        </div>
    )
}

const Login = props => {
    const [formState, setFormState] = useState({ email: '', password: '' })
    const [login, { error, data }] = useMutation(LOGIN_USER)

    // update state based on form input changes
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
        } catch (e) {
            console.error(e)
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        })
    }

    return (
        <FormWrapper>
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
        </FormWrapper>
    )
}

export default Login
