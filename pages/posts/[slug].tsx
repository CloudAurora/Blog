import React from 'react'
import { useRouter } from 'next/router'
import { createStaticPropsFunc } from 'apollo/client'
import {
    PostQuery,
    PostDocument,
    PostQueryVariables,
    usePostQuery,
} from 'generated/graphql'
import { PostDetail } from 'components/post-detail'
import { GetStaticPaths } from 'next'
import { PrismaClient } from '@prisma/client'
import { isServer } from 'utils'
import { Loading } from 'components/loading'
import { Grid, Container } from '@material-ui/core'
import { Toc } from 'components/toc'
interface Props {
    post?: PostQuery['post']
}

export default ({ post }: Props) => {
    const router = useRouter()
    const slug = router.query.slug
    if (typeof slug !== 'string') {
        return <div>error, slug must be string: {JSON.stringify(slug)}</div>
    }

    const { data, loading, error } = usePostQuery({
        variables: { slug },
        skip: isServer(),
    })

    if (loading) {
        return <Loading />
    }
    post = data?.post ?? post
    if (post == null) {
        return <div>error: {error?.message}</div>
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8} xl={6}>
                <PostDetail post={post} />
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
                <Toc post={post}  />
            </Grid>
        </Grid>
    )
}

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

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    const prisma: PrismaClient = require('../../prisma/client')()
    const result = await prisma.post.findMany({ select: { slug: true } })
    return {
        paths: result.map(({ slug }) => ({ params: { slug } })),
        fallback: false,
    }
}
