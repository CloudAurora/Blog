import React from 'react'
import { PostsQuery } from 'generated/graphql'
import { PostCard } from './post-card'
import styles from 'styles/posts.module.less'

interface Props {
    posts: PostsQuery['posts']
}
export const Posts = ({ posts }: React.PropsWithChildren<Props>) => {
    console.log(posts)
    return (
        <section>
            {posts.map((post) => {
                return <PostCard post={post} key={post.id} />
            })}
        </section>
    )
}
