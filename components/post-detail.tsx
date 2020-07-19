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
    Grid,
    Chip,
} from '@material-ui/core'
import { PostMeta } from './post-meta'
import { MdRender } from './md-render'
import StyleOutlinedIcon from '@material-ui/icons/StyleOutlined'
import { MyLink } from './my-link'
import { ScrollTop } from './scroll-top'
import { Comment } from './comment'

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(-2),
            borderRadius: 0,
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
            [theme.breakpoints.down('xs')]: {
                padding: theme.spacing(1)
            },
        },
        center: {
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0),
            marginBottom: theme.spacing(1),
            marginTop: theme.spacing(1),
        },
        tags: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
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
        <>
            <Fade in>
                <Card className={classes.root}>
                    <CardContent className={classes.top}>
                        <Typography variant="h4" component="h2" gutterBottom id="article-title">
                            {post.title}
                        </Typography>
                    </CardContent>
                    <Divider light />
                    <CardContent className={classes.center}>
                        <PostMeta
                            isDetail
                            author={post.author!}
                            // createdAt={post.createdAt}
                            categories={post.categories}
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
                    <Divider light />
                    <CardContent>
                        <Grid
                            container
                            wrap={'wrap'}
                            spacing={1}
                            className={classes.tags}
                        >
                            {post.tags.map((tag) => (
                                <Grid item key={tag.id}>
                                    <Chip
                                        clickable
                                        // variant="outlined"
                                        // color="primary"
                                        icon={<StyleOutlinedIcon />}
                                        component={MyLink}
                                        href={'/tags/[slug]'}
                                        as={`/tags/${tag.slug}`}
                                        size="small"
                                        label={tag.name}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                    {/* <Divider light /> */}
                    {/* <CardActions>
                <Button size="small" color="primary">
                    Read More
                </Button>
            </CardActions> */}
                    <ScrollTop element="#article-title" />
                </Card>
            </Fade>
            <Comment id={post.title} />
        </>
    )
}
