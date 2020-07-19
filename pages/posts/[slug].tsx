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
    Hidden,
} from '@material-ui/core'
import { Toc } from 'components/toc'
import { useRemark } from 'hooks'
import { Helmet } from 'react-helmet'
interface Props {
    post?: PostQuery['post']
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100%',
        },
        postCol: {
            flexGrow: 1,
            flexShrink: 1,
            width: '100%',
            maxWidth: theme.breakpoints.width('md'),
        },
        sticky: {
            position: 'sticky',
            top: 0,
            left: 0,
            marginLeft: theme.spacing(2),
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
        <Grid container alignItems="flex-start" justify="center" wrap="nowrap">
            <Helmet>
                <title>{post.title} - Code Aurora</title>
            </Helmet>
            <Grid item className={classes.postCol}>
                <PostDetail post={post} doc={doc} />
            </Grid>
            <Hidden mdDown>
                {!!toc && (
                    <Grid className={classes.sticky}>
                        <Toc toc={toc} />
                    </Grid>
                )}
            </Hidden>
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
