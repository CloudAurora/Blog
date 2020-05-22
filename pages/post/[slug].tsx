import React from 'react'
import { useRouter } from 'next/router'
import { createStaticPropsFunc, withApollo } from 'apollo/client'
import {
    PostQuery,
    PostDocument,
    PostQueryVariables,
    usePostQuery,
} from 'generated/graphql'
import { PostDetail } from 'components/post-detail'
import { GetStaticPaths } from 'next'
import { PrismaClient } from '@prisma/client'
interface Props {
    post?: PostQuery['post']
}

export default withApollo(({ post }: Props) => {
    const router = useRouter()
    const slug = router.query.slug
    if (typeof slug !== 'string') {
        return <div>error, slug must be string: {JSON.stringify(slug)}</div>
    }
    const { data, loading, error } = usePostQuery({
        variables: { slug },
        skip: typeof window === undefined,
    })

    if (loading) {
        return <div>loading...</div>
    }
    post = data?.post ?? post
    if (post == null) {
        return <div>error</div>
    }

    return <PostDetail post={post} />
})

export const getStaticProps = createStaticPropsFunc<Props>(
    async (context, client) => {
        const slug = context.params?.slug
        if (typeof slug !== 'string') return { props: {} }
        const result = await client.query<PostQuery, PostQueryVariables>({
            query: PostDocument,
            variables: { slug },
        })
        return { props: { post: result.data.post } }
    }
)

let prisma: PrismaClient
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    prisma = prisma ?? new (require('@prisma/client').PrismaClient)()
    const result = await prisma.post.findMany({ select: { slug: true } })
    return {
        paths: result.map(({ slug }) => ({ params: { slug } })),
        fallback: false,
    }
}
