import React from 'react'
import { TagQuery, TagQueryVariables, TagDocument } from 'generated/graphql'
import { createStaticPropsFunc, createStaticPathsFunc } from 'apollo/client'
import {
    Container,
    Typography,
    makeStyles,
    Theme,
    createStyles,
    Paper,
    Grid,
} from '@material-ui/core'
import StyleOutlinedIcon from '@material-ui/icons/StyleOutlined'
import { PostList } from 'components/post-list'
import { useMdContainer } from 'styles/container'
import { Helmet } from 'react-helmet'

interface Props {
    tag?: TagQuery['tag']
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            fontSize: 14,
        },
        paper: {
            marginTop: theme.spacing(3),
        },
        icon: {
            color: theme.palette.text.secondary,
        },
    })
)

export default ({ tag }: Props) => {
    const classes = useStyles()
    const classes2 = useMdContainer()
    if (tag == null) {
        return <div>error</div>
    }
    return (
        <Container maxWidth="lg" className={classes2.container}>
            <Helmet>
                <title>{tag.name} - Tag - Code Aurora</title>
            </Helmet>
            <Grid container spacing={1} alignItems={'center'}>
                <Grid item>
                    <StyleOutlinedIcon className={classes.icon} />
                </Grid>
                <Grid item>
                    <Typography
                        // className={classes.title}
                        variant={'subtitle1'}
                        color="textSecondary"
                        gutterBottom
                    >
                        TAG
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="h5" component="h2" gutterBottom>
                {tag.name} ({tag.posts.length})
            </Typography>
            <Paper elevation={2} className={classes.paper}>
                <PostList posts={tag.posts} />
            </Paper>
        </Container>
    )
}

export const getStaticProps = createStaticPropsFunc<Props>(
    async (context, client) => {
        const slug = context.params?.slug
        if (typeof slug !== 'string') return { props: {} }
        const result = await client.query<TagQuery, TagQueryVariables>({
            query: TagDocument,
            variables: { slug },
        })
        return { props: { tag: result.data.tag } }
    }
)

export const getStaticPaths = createStaticPathsFunc<{ slug: string }>(
    async (prisma) => {
        const result = await prisma.tag.findMany({
            select: { slug: true },
        })
        return {
            paths: result.map(({ slug }) => ({ params: { slug } })),
            fallback: false,
        }
    }
)
