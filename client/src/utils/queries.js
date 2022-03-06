import { gql } from '@apollo/client'

export const QUERY_USER = gql`
    query user {
        user {
            _id
            username
            email
            coins
        }
    }
`

export const QUERY_COINS = gql`
    query user {
        user {
            coins
        }
    }
`
