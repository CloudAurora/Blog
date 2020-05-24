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
    Fade,
    Container,
} from '@material-ui/core'
import { PostMeta } from './post-meta'
import { MdRender } from './md-render'

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(0),
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
            paddingRight: theme.spacing(4),
        },
        center: {
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0),
        },
    })
)

interface Props {
    post: NonNullable<PostQuery['post']>
    doc: React.ReactNode
}
export const PostDetail = ({ doc, post }: Props) => {
    const classes = useStyle()
    // const
    return (
        <Fade in>
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
                    {!!post.content && (
                        <Typography
                            variant="body1"
                            gutterBottom
                            component="article"
                        >
                            <MdRender>{doc}</MdRender>
                        </Typography>
                    )}
                </CardContent>
                {/* <Divider light /> */}
                {/* <CardActions>
                <Button size="small" color="primary">
                    Read More
                </Button>
            </CardActions> */}
            </Card>
        </Fade>
    )
}
