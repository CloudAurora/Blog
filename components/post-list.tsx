import * as React from 'react'
import {
    makeStyles,
    Theme,
    createStyles,
    List,
    ListItem,
    ListItemText,
    Grid,
} from '@material-ui/core'
import { PostEntity } from 'types'
import { MyLink } from './my-link'
import { PostMeta } from './post-meta'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            width: '100%',
        },
    })
)

interface Props {
    posts: PostEntity[]
    dense?: boolean
}
export const PostList = ({ posts, dense }: Props) => {
    const classes = useStyles()
    return (
        <List className={classes.list} dense={dense}>
            {posts.map((post) => (
                <ListItem
                    button
                    key={post.id}
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
    )
}
