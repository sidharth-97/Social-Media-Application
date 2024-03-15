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
    recommendedUsers{
      id
      firstName
      lastName
      profileImage
    },
    followers{
      id
      firstName
      lastName
      profileImage
    }
    following{
      id
      firstName
      lastName
      profileImage
    }
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
    followers{
      id
      firstName
      lastName
      profileImage
    }
    following{
      id
      firstName
      lastName
      profileImage
    }
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

