import { createStaticPropsFunc } from '../apollo/client'
import { useRouter } from 'next/router'
import { PostsQuery, PostsDocument, usePostsQuery } from 'generated/graphql'
import { Posts } from 'components/posts'
import { isServer } from 'utils'
import { Loading } from 'components/loading'
import { Container } from '@material-ui/core'
import { useMdContainer } from 'styles/container'
interface Props {
    posts?: PostsQuery['posts']
}


const Index = ({ posts }: Props) => {
    const classes = useMdContainer()
    const router = useRouter()
    const { data, loading, error } = usePostsQuery({
        skip: isServer(),
        variables: {
            keyword: router.query.keyword as string,
        },
        // fetchPolicy: 'network-only',
    })

    posts = data?.posts ?? posts

    if (loading) return <Loading size={90} />
    if (posts != null) {
        return (
            <Container className={classes.container} maxWidth="xl">
                <Posts posts={posts} />
            </Container>
        )
    }
    return <div>error</div>
}

export const getStaticProps = createStaticPropsFunc<Props>(
    async (_context, client) => {
        const result = await client.query<PostsQuery>({ query: PostsDocument })
        return { props: { posts: result.data?.posts } }
    }
)

export default Index
