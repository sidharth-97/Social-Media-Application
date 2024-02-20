import {graphql} from '../../gql'

export const verifyTokenQuery = graphql(`#graphql
    query verifyTokenQuery($token:String!){
        verifyGoogleToken(token: $token)
    }
`)