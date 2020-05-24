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
import {
    Grid,
    Container,
    makeStyles,
    Theme,
    createStyles,
    useTheme,
} from '@material-ui/core'
import { Toc } from 'components/toc'
import { useRemark } from 'hooks'
import { StickyContainer, Sticky } from 'react-sticky'
interface Props {
    post?: PostQuery['post']
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100%',
            overflow: 'hidden auto',
        },
        postCol: {
            maxWidth: theme.breakpoints.width('lg'),
        },
    })
)
export default ({ post }: Props) => {
    const theme = useTheme()
    const router = useRouter()
    const slug = router.query.slug
    const classes = useStyles()

    if (typeof slug !== 'string') {
        return <div>error, slug must be string: {JSON.stringify(slug)}</div>
    }

    const { data, loading, error } = usePostQuery({
        variables: { slug },
        skip: isServer(),
    })

    post = data?.post ?? post
    const [doc, toc] = useRemark(post?.content ?? '')

    if (loading) {
        return <Loading />
    }
    if (post == null) {
        return <div>error: {error?.message}</div>
    }

    return (
        <StickyContainer className={classes.container}>
            <Grid
                container
                spacing={2}
                alignItems="flex-start"
                justify="center"
                wrap="nowrap"
            >
                <Grid
                    item
                    xs={12}
                    lg={toc ? 8 : 12}
                    className={classes.postCol}
                >
                    <PostDetail post={post} doc={doc} />
                </Grid>
                {!!toc && (
                    <Grid item xs={12} lg={4}>
                        <Sticky relative>
                            {({ style, isSticky }) => {
                                return (
                                    <Toc
                                        style={{
                                            ...style,
                                            top:
                                                parseInt(`${style.top || 0}`) +
                                                (isSticky
                                                    ? theme.spacing(5.5)
                                                    : 0),
                                        }}
                                        toc={toc}
                                    />
                                )
                            }}
                        </Sticky>
                    </Grid>
                )}
            </Grid>
        </StickyContainer>
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
