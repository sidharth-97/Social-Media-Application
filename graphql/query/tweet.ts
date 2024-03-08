import { graphql } from "@/gql";

export const getAllTweetQuery = graphql(`#graphql
  query GetAllTweets {
    getAllTweets {
      id
      content
      imageURL
      author {
        firstName
        lastName
        profileImage
      }
    }
  }
`);

export const getSignedImageURL = graphql(`#graphql 
query GetsignedUrl($imageName: String!, $imageType: String!) {
  getSignedUrl(imageName: $imageName, imageType: $imageType)
}
`)
