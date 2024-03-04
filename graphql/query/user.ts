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
    lastName,
    tweets{
      id,
      content,
      author{
        id
        firstName,
        lastName,
        profileImage
      }
    }
  }
}
`)

export const getUserByIdQuery = graphql(`#graphql
query GetUserById($id: ID!) {
  getUserById(id: $id) {
    id
    firstName
    lastName
    email
    profileImage
    tweets {
      id
      content
      author {
        firstName
        id
        profileImage
      }
    }
  }
}
`)

