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
    Link,
    CardMedia,
} from '@material-ui/core'
import { MdRender } from './md-render'
import { PostMeta } from './post-meta'
import { MyLink } from './MyLink'

interface Props {
    post: ItemType<PostsQuery['posts']>
}

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: theme.spacing(70),
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
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="240"
                image="/static/banner3.jpg"
                title="Contemplative Reptile"
            />
            <CardContent className={classes.top}>
                <Typography variant="h5" component="h2" gutterBottom>
                    <Link
                        href="/posts/[slug]"
                        as={`/posts/${post.slug}`}
                        component={MyLink}
                    >
                        {post.title}
                    </Link>
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
                {!!post.excerpt && (
                    <Typography
                        variant="body2"
                        component="div"
                        // color="textSecondary"
                        className={'md-container'}
                    >
                        <MdRender>{post.excerpt}</MdRender>
                    </Typography>
                )}
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
