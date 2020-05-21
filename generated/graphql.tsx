import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<Post>;
  user?: Maybe<User>;
  posts: Array<Post>;
};


export type QueryPostArgs = {
  where: PostWhereUniqueInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryPostsArgs = {
  where?: Maybe<QueryPostsWhereInput>;
  orderBy?: Maybe<QueryPostsOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<PostWhereUniqueInput>;
  before?: Maybe<PostWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  excerpt?: Maybe<Scalars['String']>;
  draft: Scalars['Boolean'];
  author?: Maybe<User>;
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  posts: Array<Post>;
  postCount: Scalars['Int'];
};

export type PostWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type QueryPostsWhereInput = {
  authorId?: Maybe<NullableIntFilter>;
  content?: Maybe<NullableStringFilter>;
  title?: Maybe<StringFilter>;
};

export type QueryPostsOrderByInput = {
  updatedAt?: Maybe<OrderByArg>;
};


export type NullableIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
};

export type NullableStringFilter = {
  equals?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

export type PostDetailQueryVariables = {
  id: Scalars['Int'];
};


export type PostDetailQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'content' | 'slug' | 'excerpt' | 'draft' | 'createdAt' | 'updatedAt'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  )> }
);

export type PostsQueryVariables = {
  keyword?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['Int']>;
};


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'slug' | 'excerpt' | 'draft' | 'createdAt' | 'updatedAt'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    )> }
  )> }
);


export const PostDetailDocument = gql`
    query PostDetail($id: Int!) {
  post(where: {id: $id}) {
    id
    title
    content
    slug
    excerpt
    draft
    createdAt
    updatedAt
    author {
      id
      name
    }
  }
}
    `;

/**
 * __usePostDetailQuery__
 *
 * To run a query within a React component, call `usePostDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostDetailQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostDetailQuery, PostDetailQueryVariables>) {
        return ApolloReactHooks.useQuery<PostDetailQuery, PostDetailQueryVariables>(PostDetailDocument, baseOptions);
      }
export function usePostDetailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostDetailQuery, PostDetailQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostDetailQuery, PostDetailQueryVariables>(PostDetailDocument, baseOptions);
        }
export type PostDetailQueryHookResult = ReturnType<typeof usePostDetailQuery>;
export type PostDetailLazyQueryHookResult = ReturnType<typeof usePostDetailLazyQuery>;
export type PostDetailQueryResult = ApolloReactCommon.QueryResult<PostDetailQuery, PostDetailQueryVariables>;
export const PostsDocument = gql`
    query Posts($keyword: String, $user: Int) {
  posts(orderBy: {updatedAt: desc}, where: {title: {contains: $keyword}, content: {contains: $keyword}, authorId: {equals: $user}}) {
    id
    title
    slug
    excerpt
    draft
    createdAt
    updatedAt
    author {
      id
      name
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      user: // value for 'user'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;