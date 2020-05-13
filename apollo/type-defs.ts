import gql from 'graphql-tag'

/**
 * https://stackoverflow.com/questions/47874344/should-i-handle-a-graphql-id-as-a-string-on-the-client
 */
export const typeDefs = gql`
  enum Role {
    ADMIN,
    AUTHOR,
    USER
  }

  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String
    role: Role!
  }

  type PostTag {
    id: ID!
    name: String!
    # slug: String! @slurg
  }

  type Page {
    id: ID!
    slug: String!
    title: String!
    body: String!
    draft: Boolean
  }

  type Post {
    id: ID!
    slug: String!
    author: User!
    contentHash: String! @hash(from: ["body"])
    title: String!
    date: Date!
    excerpt(pruneLength: Int = 160): String
    body: String!
    html: String
    timeToRead: Int
    tags: [PostTag]
    banner: String
    draft: Boolean
  }

  type PostQueryResult {
    total: Int!
    items: [Post]!
  }


  type Query {
    posts(authorID: ID, tagID: ID, keyword: String, offset: Int = 0, limit: Int = 20): PostQueryResult!
    post(id: ID!): Post
    userByID(id: ID!): User
    tags: [PostTag]!
    # searchUser(name: String!, role: Role = WRITE): [User]!
  }

  # type Mutation {
    # signUp(input: SignUpInput!): SignUpPayload!
    # signIn(input: SignInInput!): SignInPayload!
    # signOut: Boolean!
  # }
`
