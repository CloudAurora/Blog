import React from 'react'
import { PostsQuery } from 'generated/graphql'
import { PostCard } from './post-card'
import { useWaterfallStyles } from 'styles/waterfall'

interface Props {
    posts: PostsQuery['posts']
}
export const Posts = ({ posts }: React.PropsWithChildren<Props>) => {
    const classes = useWaterfallStyles()
    return (
        <section className={classes.root}>
            {posts.map((post) => {
                return (
                    <div key={post.id} className={classes.item}>
                        <PostCard post={post} key={post.id} />
                    </div>
                )
            })}
        </section>
    )
}
