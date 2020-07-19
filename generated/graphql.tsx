import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | undefined;
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
  tag?: Maybe<Tag>;
  category?: Maybe<Category>;
  tags: Array<Tag>;
  categories: Array<Category>;
  posts: Array<Post>;
};


export type QueryPostArgs = {
  where: PostWhereUniqueInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryTagArgs = {
  where: TagWhereUniqueInput;
};


export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryTagsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<TagWhereUniqueInput>;
  before?: Maybe<TagWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCategoriesArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<CategoryWhereUniqueInput>;
  before?: Maybe<CategoryWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryPostsArgs = {
  where?: Maybe<PostWhereInput>;
  orderBy?: Maybe<QueryPostsOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<PostWhereUniqueInput>;
  before?: Maybe<PostWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
  posts: Array<Post>;
  postCount: Scalars['Int'];
};


export type CategoryPostsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<PostWhereUniqueInput>;
  before?: Maybe<PostWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
  posts: Array<Post>;
};


export type TagPostsArgs = {
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
  categories: Array<Category>;
  tags: Array<Tag>;
};


export type PostCategoriesArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<CategoryWhereUniqueInput>;
  before?: Maybe<CategoryWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type PostTagsArgs = {
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<TagWhereUniqueInput>;
  before?: Maybe<TagWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  githubId?: Maybe<Scalars['String']>;
  posts: Array<Post>;
  postCount: Scalars['Int'];
};

export type PostWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type TagWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type CategoryWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type PostWhereInput = {
  authorId?: Maybe<NullableIntFilter>;
  content?: Maybe<NullableStringFilter>;
  excerpt?: Maybe<NullableStringFilter>;
  id?: Maybe<IntFilter>;
  draft?: Maybe<BooleanFilter>;
  title?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  slug?: Maybe<StringFilter>;
  source?: Maybe<StringFilter>;
  categories?: Maybe<CategoryFilter>;
  tags?: Maybe<TagFilter>;
  AND?: Maybe<Array<PostWhereInput>>;
  OR?: Maybe<Array<PostWhereInput>>;
  NOT?: Maybe<Array<PostWhereInput>>;
  author?: Maybe<UserWhereInput>;
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

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
};

export type BooleanFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<Scalars['Boolean']>;
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

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
};

export type CategoryFilter = {
  every?: Maybe<CategoryWhereInput>;
  some?: Maybe<CategoryWhereInput>;
  none?: Maybe<CategoryWhereInput>;
};

export type TagFilter = {
  every?: Maybe<TagWhereInput>;
  some?: Maybe<TagWhereInput>;
  none?: Maybe<TagWhereInput>;
};

export type UserWhereInput = {
  email?: Maybe<StringFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<NullableStringFilter>;
  bio?: Maybe<NullableStringFilter>;
  githubId?: Maybe<NullableStringFilter>;
  posts?: Maybe<PostFilter>;
  AND?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

export type CategoryWhereInput = {
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  slug?: Maybe<StringFilter>;
  posts?: Maybe<PostFilter>;
  AND?: Maybe<Array<CategoryWhereInput>>;
  OR?: Maybe<Array<CategoryWhereInput>>;
  NOT?: Maybe<Array<CategoryWhereInput>>;
};

export type TagWhereInput = {
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  slug?: Maybe<StringFilter>;
  posts?: Maybe<PostFilter>;
  AND?: Maybe<Array<TagWhereInput>>;
  OR?: Maybe<Array<TagWhereInput>>;
  NOT?: Maybe<Array<TagWhereInput>>;
};

export type PostFilter = {
  every?: Maybe<PostWhereInput>;
  some?: Maybe<PostWhereInput>;
  none?: Maybe<PostWhereInput>;
};

export type ArchivesQueryVariables = {};


export type ArchivesQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'slug' | 'draft' | 'createdAt' | 'updatedAt'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'githubId'>
    )>, categories: Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'slug' | 'name'>
    )>, tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'slug' | 'name'>
    )> }
  )> }
);

export type CategoriesQueryVariables = {};


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'slug' | 'name' | 'postCount'>
  )> }
);

export type CategoryPostsQueryVariables = {
  id: Scalars['Int'];
};


export type CategoryPostsQuery = (
  { __typename?: 'Query' }
  & { category?: Maybe<(
    { __typename?: 'Category' }
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'slug' | 'updatedAt'>
      & { author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'githubId'>
      )> }
    )> }
  )> }
);

export type CategoryQueryVariables = {
  slug: Scalars['String'];
};


export type CategoryQuery = (
  { __typename?: 'Query' }
  & { category?: Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'slug' | 'updatedAt'>
      & { author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'githubId'>
      )> }
    )> }
  )> }
);

export type PostQueryVariables = {
  slug: Scalars['String'];
};


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'content' | 'slug' | 'draft' | 'createdAt' | 'updatedAt'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email' | 'bio' | 'githubId'>
    )>, categories: Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'slug' | 'name'>
    )>, tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'slug' | 'name'>
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
      & Pick<User, 'id' | 'name' | 'email' | 'bio' | 'githubId'>
    )>, categories: Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'slug' | 'name'>
    )>, tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'slug' | 'name'>
    )> }
  )> }
);

export type RecentPostsQueryVariables = {
  limit: Scalars['Int'];
};


export type RecentPostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'slug'>
  )> }
);

export type TagQueryVariables = {
  slug: Scalars['String'];
};


export type TagQuery = (
  { __typename?: 'Query' }
  & { tag?: Maybe<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id' | 'name'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'slug' | 'title' | 'updatedAt'>
      & { author?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'githubId'>
      )> }
    )> }
  )> }
);

export type TagsQueryVariables = {};


export type TagsQuery = (
  { __typename?: 'Query' }
  & { tags: Array<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id' | 'slug' | 'name'>
  )> }
);


export const ArchivesDocument = gql`
    query Archives {
  posts(orderBy: {updatedAt: desc}) {
    id
    title
    slug
    draft
    createdAt
    updatedAt
    author {
      id
      name
      githubId
    }
    categories {
      id
      slug
      name
    }
    tags {
      id
      slug
      name
    }
  }
}
    `;

/**
 * __useArchivesQuery__
 *
 * To run a query within a React component, call `useArchivesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArchivesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArchivesQuery({
 *   variables: {
 *   },
 * });
 */
export function useArchivesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ArchivesQuery, ArchivesQueryVariables>) {
        return ApolloReactHooks.useQuery<ArchivesQuery, ArchivesQueryVariables>(ArchivesDocument, baseOptions);
      }
export function useArchivesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ArchivesQuery, ArchivesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ArchivesQuery, ArchivesQueryVariables>(ArchivesDocument, baseOptions);
        }
export type ArchivesQueryHookResult = ReturnType<typeof useArchivesQuery>;
export type ArchivesLazyQueryHookResult = ReturnType<typeof useArchivesLazyQuery>;
export type ArchivesQueryResult = ApolloReactCommon.QueryResult<ArchivesQuery, ArchivesQueryVariables>;
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    slug
    name
    postCount
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
      }
export function useCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, baseOptions);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = ApolloReactCommon.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryPostsDocument = gql`
    query CategoryPosts($id: Int!) {
  category(where: {id: $id}) {
    posts {
      id
      title
      slug
      updatedAt
      author {
        id
        name
        githubId
      }
    }
  }
}
    `;

/**
 * __useCategoryPostsQuery__
 *
 * To run a query within a React component, call `useCategoryPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryPostsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCategoryPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoryPostsQuery, CategoryPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoryPostsQuery, CategoryPostsQueryVariables>(CategoryPostsDocument, baseOptions);
      }
export function useCategoryPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoryPostsQuery, CategoryPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoryPostsQuery, CategoryPostsQueryVariables>(CategoryPostsDocument, baseOptions);
        }
export type CategoryPostsQueryHookResult = ReturnType<typeof useCategoryPostsQuery>;
export type CategoryPostsLazyQueryHookResult = ReturnType<typeof useCategoryPostsLazyQuery>;
export type CategoryPostsQueryResult = ApolloReactCommon.QueryResult<CategoryPostsQuery, CategoryPostsQueryVariables>;
export const CategoryDocument = gql`
    query Category($slug: String!) {
  category(where: {slug: $slug}) {
    id
    name
    posts {
      id
      title
      slug
      updatedAt
      author {
        id
        name
        githubId
      }
    }
  }
}
    `;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCategoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, baseOptions);
      }
export function useCategoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, baseOptions);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategoryQueryResult = ApolloReactCommon.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const PostDocument = gql`
    query Post($slug: String!) {
  post(where: {slug: $slug}) {
    id
    title
    content
    slug
    draft
    createdAt
    updatedAt
    author {
      id
      name
      email
      bio
      githubId
    }
    categories {
      id
      slug
      name
    }
    tags {
      id
      slug
      name
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function usePostQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return ApolloReactHooks.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = ApolloReactCommon.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($keyword: String, $user: Int) {
  posts(orderBy: {updatedAt: desc}, where: {OR: [{content: {contains: $keyword}}, {title: {contains: $keyword}}], authorId: {equals: $user}}) {
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
      email
      bio
      githubId
    }
    categories {
      id
      slug
      name
    }
    tags {
      id
      slug
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
export const RecentPostsDocument = gql`
    query RecentPosts($limit: Int!) {
  posts(orderBy: {updatedAt: desc}, first: $limit) {
    id
    title
    slug
  }
}
    `;

/**
 * __useRecentPostsQuery__
 *
 * To run a query within a React component, call `useRecentPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useRecentPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecentPostsQuery, RecentPostsQueryVariables>) {
        return ApolloReactHooks.useQuery<RecentPostsQuery, RecentPostsQueryVariables>(RecentPostsDocument, baseOptions);
      }
export function useRecentPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecentPostsQuery, RecentPostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RecentPostsQuery, RecentPostsQueryVariables>(RecentPostsDocument, baseOptions);
        }
export type RecentPostsQueryHookResult = ReturnType<typeof useRecentPostsQuery>;
export type RecentPostsLazyQueryHookResult = ReturnType<typeof useRecentPostsLazyQuery>;
export type RecentPostsQueryResult = ApolloReactCommon.QueryResult<RecentPostsQuery, RecentPostsQueryVariables>;
export const TagDocument = gql`
    query Tag($slug: String!) {
  tag(where: {slug: $slug}) {
    id
    name
    posts {
      id
      slug
      title
      updatedAt
      author {
        id
        name
        githubId
      }
    }
  }
}
    `;

/**
 * __useTagQuery__
 *
 * To run a query within a React component, call `useTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useTagQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TagQuery, TagQueryVariables>) {
        return ApolloReactHooks.useQuery<TagQuery, TagQueryVariables>(TagDocument, baseOptions);
      }
export function useTagLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TagQuery, TagQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TagQuery, TagQueryVariables>(TagDocument, baseOptions);
        }
export type TagQueryHookResult = ReturnType<typeof useTagQuery>;
export type TagLazyQueryHookResult = ReturnType<typeof useTagLazyQuery>;
export type TagQueryResult = ApolloReactCommon.QueryResult<TagQuery, TagQueryVariables>;
export const TagsDocument = gql`
    query Tags {
  tags {
    id
    slug
    name
  }
}
    `;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        return ApolloReactHooks.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, baseOptions);
      }
export function useTagsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, baseOptions);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsQueryResult = ApolloReactCommon.QueryResult<TagsQuery, TagsQueryVariables>;