import React from 'react'
import { TagQuery, TagQueryVariables, TagDocument } from 'generated/graphql'
import { createStaticPropsFunc, createStaticPathsFunc } from 'apollo/client'
import { GetStaticPaths } from 'next'
import {
    Container,
    Card,
    Typography,
    makeStyles,
    Theme,
    createStyles,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Paper,
    Grid,
} from '@material-ui/core'
import moment from 'moment'
import StyleOutlinedIcon from '@material-ui/icons/StyleOutlined'
import { MyLink } from 'components/my-link'
import { PostMeta } from 'components/post-meta'

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
    if (tag == null) {
        return <div>error</div>
    }
    return (
        <Container maxWidth="lg">
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
                <List>
                    {tag.posts.map((post) => (
                        <ListItem
                            button
                            key={post.slug}
                            href="/posts/[slug]"
                            as={`/posts/${post.slug}`}
                            component={MyLink}
                        >
                            <ListItemText
                                primary={
                                    <Grid container alignItems={'stretch'}>
                                        <Grid item style={{ flexGrow: 1 }}>
                                            {post.title}
                                        </Grid>
                                        <Grid item>
                                            <PostMeta
                                                author={post.author!}
                                                updatedAt={post.updatedAt}
                                            />
                                        </Grid>
                                    </Grid>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
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
