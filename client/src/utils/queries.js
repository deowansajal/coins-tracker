import { gql } from '@apollo/client'

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            coins
            thoughts {
                _id
                thoughtText
                createdAt
            }
        }
    }
`

// export const QUERY_COINS = gql`
//   query coins() {
//     coins() {
//          coins
//       }
//     }
//   }
// `
