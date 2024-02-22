import {graphql} from '../../gql'

export const verifyTokenQuery = graphql(`#graphql
    query verifyTokenQuery($token:String!){
        verifyGoogleToken(token: $token)
    }
`)

export const getCurrentUserQuery = graphql(`#graphql
query GetCurrentUser {
  getCurrentUser {
    id,
    profileImage,
    firstName,
    email,
    lastName
  }
}
`)