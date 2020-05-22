import React, { PropsWithChildren } from 'react'
import { PostsQuery } from 'generated/graphql'
import { ItemType } from 'types'
import {
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Divider,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core'
import { MdRender } from './md-render'
import { PostMeta } from './post-meta'
import Link from 'next/link'

interface Props {
    post: ItemType<PostsQuery['posts']>
}

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(3),
        },
        top: {
            paddingBottom: theme.spacing(1),
        },
        bottom: {
            paddingTop: theme.spacing(1),
        },
        center: {
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0),
        },
    })
)

export const PostCard = ({ post }: PropsWithChildren<Props>) => {
    const classes = useStyle()
    // const 
    return (
        <Card className={classes.root}>
            <CardContent className={classes.top}>
                <Typography variant="h5" component="h2" gutterBottom>
                    <Link href="/post/[slug]" as={`/post/${post.slug}`}>{post.title}</Link>
                </Typography>
            </CardContent>
            <Divider light />
            <CardContent className={classes.center}>
                <PostMeta
                    author={post.author}
                    createdAt={post.createdAt}
                    updatedAt={post.updatedAt}
                />
            </CardContent>
            <Divider light />
            <CardContent className={classes.bottom}>
                {!!post.excerpt && <MdRender>{post.excerpt}</MdRender>}
            </CardContent>
            <Divider light />
            <CardActions>
                <Button size="small" color="primary">
                    Read More
                </Button>
            </CardActions>
        </Card>
    )
}
