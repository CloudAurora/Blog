import React from 'react'
import { useRouter } from 'next/router'
import { createStaticPropsFunc, createStaticPathsFunc } from 'apollo/client'
import {
    PostQuery,
    PostDocument,
    PostQueryVariables,
    // usePostQuery,
} from 'generated/graphql'
import { PostDetail } from 'components/post-detail'
// import { isServer } from 'utils'
// import { Loading } from 'components/loading'
import {
    Grid,
    makeStyles,
    Theme,
    createStyles,
    useTheme,
} from '@material-ui/core'
import { Toc } from 'components/toc'
import { useRemark } from 'hooks'
interface Props {
    post?: PostQuery['post']
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100%',
        },
        postCol: {
            maxWidth: theme.breakpoints.width('lg'),
        },
        sticky: {
            position: 'sticky',
            top: 0,
            left: 0,
        },
    })
)
export default ({ post }: Props) => {
    const router = useRouter()
    const slug = router.query.slug
    const classes = useStyles()

    if (typeof slug !== 'string') {
        return <div>error, slug must be string: {JSON.stringify(slug)}</div>
    }

    // const { data, loading, error } = usePostQuery({
    //     variables: { slug },
    //     skip: isServer(),
    // })

    // post = data?.post ?? post
    const [doc, toc] = useRemark(post?.content ?? '')

    // if (loading) {
    //     return <Loading />
    // }
    if (post == null) {
        return <div>error</div>
    }

    return (
        <Grid
            container
            spacing={2}
            alignItems="flex-start"
            justify="center"
            wrap="nowrap"
        >
            <Grid item xs={12} lg={toc ? 8 : 12} className={classes.postCol}>
                <PostDetail post={post} doc={doc} />
            </Grid>
            {!!toc && (
                <Grid className={classes.sticky} item xs={12} lg={4}>
                    <Toc toc={toc} />
                </Grid>
            )}
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

export const getStaticPaths = createStaticPathsFunc<{ slug: string }>(
    async (prisma) => {
        const result = await prisma.post.findMany({ select: { slug: true } })
        return {
            paths: result.map(({ slug }) => ({ params: { slug } })),
            fallback: false,
        }
    }
)
