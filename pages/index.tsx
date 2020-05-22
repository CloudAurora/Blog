import { withApollo, createStaticPropsFunc } from '../apollo/client'
import { useRouter } from 'next/router'
import { PostsQuery, PostsDocument, usePostsQuery } from 'generated/graphql'

interface Props {
    posts?: PostsQuery['posts']
}
const Index = ({ posts }: Props) => {
    const router = useRouter()
    const { data, loading } = usePostsQuery({
        skip: typeof window === undefined,
        variables: {
            keyword: router.query.keyword as string,
        },
        // fetchPolicy: 'network-only',
    })

    posts = data?.posts ?? posts

    if (loading) return <div>loading...</div>
    if (posts != null) {
        return <div>{JSON.stringify(posts)}</div>
    }
    return <div>loading...</div>
}

export const getStaticProps = createStaticPropsFunc<Props>(
    async (_context, client) => {
        const result = await client.query<PostsQuery>({ query: PostsDocument })
        return { props: { posts: result.data?.posts } }
    }
)

export default withApollo(Index)
