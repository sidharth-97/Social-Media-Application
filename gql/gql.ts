/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    #graphql\n    mutation CreateTweet($payload: CreateTweetData!) {\n  createTweet(payload: $payload) {\n      id\n  }\n}\n": types.CreateTweetDocument,
    "#graphql\n  query GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURL\n      author {\n        firstName\n        lastName\n        profileImage\n      }\n    }\n  }\n": types.GetAllTweetsDocument,
    "#graphql \nquery GetsignedUrl($imageName: String!, $imageType: String!) {\n  getSignedUrl(imageName: $imageName, imageType: $imageType)\n}\n": types.GetsignedUrlDocument,
    "#graphql\n    query verifyTokenQuery($token:String!){\n        verifyGoogleToken(token: $token)\n    }\n": types.VerifyTokenQueryDocument,
    "#graphql\nquery GetCurrentUser {\n  getCurrentUser {\n    id,\n    profileImage,\n    firstName,\n    email,\n    lastName,\n    tweets{\n      id,\n      content,\n      author{\n        id\n        firstName,\n        lastName,\n        profileImage\n      }\n    }\n  }\n}\n": types.GetCurrentUserDocument,
    "#graphql\nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n    id\n    firstName\n    lastName\n    email\n    profileImage\n    tweets {\n      id\n      content\n      author {\n        firstName\n        id\n        profileImage\n      }\n    }\n  }\n}\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation CreateTweet($payload: CreateTweetData!) {\n  createTweet(payload: $payload) {\n      id\n  }\n}\n"): (typeof documents)["\n    #graphql\n    mutation CreateTweet($payload: CreateTweetData!) {\n  createTweet(payload: $payload) {\n      id\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURL\n      author {\n        firstName\n        lastName\n        profileImage\n      }\n    }\n  }\n"): (typeof documents)["#graphql\n  query GetAllTweets {\n    getAllTweets {\n      id\n      content\n      imageURL\n      author {\n        firstName\n        lastName\n        profileImage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql \nquery GetsignedUrl($imageName: String!, $imageType: String!) {\n  getSignedUrl(imageName: $imageName, imageType: $imageType)\n}\n"): (typeof documents)["#graphql \nquery GetsignedUrl($imageName: String!, $imageType: String!) {\n  getSignedUrl(imageName: $imageName, imageType: $imageType)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query verifyTokenQuery($token:String!){\n        verifyGoogleToken(token: $token)\n    }\n"): (typeof documents)["#graphql\n    query verifyTokenQuery($token:String!){\n        verifyGoogleToken(token: $token)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery GetCurrentUser {\n  getCurrentUser {\n    id,\n    profileImage,\n    firstName,\n    email,\n    lastName,\n    tweets{\n      id,\n      content,\n      author{\n        id\n        firstName,\n        lastName,\n        profileImage\n      }\n    }\n  }\n}\n"): (typeof documents)["#graphql\nquery GetCurrentUser {\n  getCurrentUser {\n    id,\n    profileImage,\n    firstName,\n    email,\n    lastName,\n    tweets{\n      id,\n      content,\n      author{\n        id\n        firstName,\n        lastName,\n        profileImage\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n    id\n    firstName\n    lastName\n    email\n    profileImage\n    tweets {\n      id\n      content\n      author {\n        firstName\n        id\n        profileImage\n      }\n    }\n  }\n}\n"): (typeof documents)["#graphql\nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n    id\n    firstName\n    lastName\n    email\n    profileImage\n    tweets {\n      id\n      content\n      author {\n        firstName\n        id\n        profileImage\n      }\n    }\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;