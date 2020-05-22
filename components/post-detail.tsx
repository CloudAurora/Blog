import React from 'react'
import { PostQuery } from 'generated/graphql'
import {
    makeStyles,
    Theme,
    createStyles,
    Card,
    CardContent,
    Typography,
    Divider,
    Button,
    CardActions,
} from '@material-ui/core'
import { PostMeta } from './post-meta'
import { MdRender } from './md-render'

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(3),
        },
        top: {
            textAlign: 'center',
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(2),
        },
        bottom: {
            paddingTop: theme.spacing(1),
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4)
        },
        center: {
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0),
        },
    })
)

interface Props {
    post: NonNullable<PostQuery['post']>
}
export const PostDetail = ({ post }: Props) => {
    const classes = useStyle()
    // const
    return (
        <Card className={classes.root}>
            <CardContent className={classes.top}>
                <Typography variant="h4" component="h2" gutterBottom>
                    {post.title}
                </Typography>
            </CardContent>
            <Divider light />
            <CardContent className={classes.center}>
                <PostMeta
                    isDetail
                    author={post.author}
                    createdAt={post.createdAt}
                    updatedAt={post.updatedAt}
                />
            </CardContent>
            <Divider light />
            <CardContent className={classes.bottom}>
                {!!post.content && <MdRender>{post.content}</MdRender>}
            </CardContent>
            {/* <Divider light /> */}
            {/* <CardActions>
                <Button size="small" color="primary">
                    Read More
                </Button>
            </CardActions> */}
        </Card>
    )
}
