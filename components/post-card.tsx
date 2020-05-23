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
    CardActionArea,
    Fade,
} from '@material-ui/core'
import { MdRender } from './md-render'
import { PostMeta } from './post-meta'
import { MyLink } from './my-link'
import { getPostHeadingImage } from 'utils'

interface Props {
    post: ItemType<PostsQuery['posts']>
}

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: '100%',
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(0),
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
    return (
        <Fade in>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="post heading image"
                        height="240"
                        image={getPostHeadingImage(post.id)}
                        title="post heading image"
                    />
                </CardActionArea>
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
                            variant="body1"
                            component="article"
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
        </Fade>
    )
}
