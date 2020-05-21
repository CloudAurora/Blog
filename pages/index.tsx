import {
    withApollo,
    // createStaticPropsFunc,
    createServerSidePropsFunc,
} from '../apollo/client'
// import Link from 'next/link'
import { useRouter } from 'next/router'
import { PostsQuery, PostsDocument } from 'generated/graphql'
// import { useQuery } from '@apollo/react-hooks'

type Props = { posts: any }
const Index = (props: Props) => {
    const router = useRouter()
    // const { data, error, loading } = usePostsQuery({
    //     variables: {
    //         keyword: router.query.keyword as string,
    //     },
    // })

    if (props.posts != null) {
        return <div>{JSON.stringify(props.posts)}</div>
    }
    return <div>error</div>
}

export const getServerSideProps = createServerSidePropsFunc<Props>(
    async (_context, client) => {
        const result = await client.query<PostsQuery>({ query: PostsDocument })
        return { props: { posts: result.data?.posts } }
    }
)

export default withApollo(Index)
