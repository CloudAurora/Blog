import { UserInputError, IResolvers } from 'apollo-server-micro'
import {
    SqlDataSource,
    PostsQueryOptions,
    PostQueryOptions,
    UserByIdQueryOptions,
    TagsQueryOptions,
} from './datasource'
import * as R from 'ramda'
import { Post, Tag } from 'db/createStore'

interface PostsArgs {}
interface ResolveContext {
    dataSources: { sql: SqlDataSource }
}

export const resolvers: IResolvers<any, ResolveContext> = {
    Query: {
        posts: async (_, args: PostsQueryOptions, context) => {
            const ret = await context.dataSources.sql.getPosts({
                ...args,
                attributes: [
                    'id',
                    'slug',
                    'authorID',
                    'title',
                    'date',
                    'banner',
                    'tags',
                    'draft',
                ],
            })

            const tagIDs = R.uniq(
                R.flatten(ret.items.map((item) => item.getTagIDs()))
            )

            const tagPools: Tag[] = tagIDs.length
                ? (await Tag.findAll({ where: { id: tagIDs } })).map(
                      (tag) => tag.toJSON() as Tag
                  )
                : []

            return {
                total: ret.total,
                items: ret.items.map((item) => {
                    const ret = item.toJSON() as any
                    const tagIDs: number[] = R.uniq(item.getTagIDs())
                    ret.tags = tagIDs
                        .map((id) => tagPools.find((tag) => tag.id === id))
                        .filter((tag): tag is Tag => !!tag)
                    return ret
                }),
            }
        },

        post: async (_, args: PostQueryOptions, context) => {
            const item = await context.dataSources.sql.getPost(args)
            if (!item) return null
            const tagIDs = item.getTagIDs()
            if (tagIDs.length === 0) return item.toJSON()
            const tagPools = await Tag.findAll({ where: { id: tagIDs } })
            return {
                ...item.toJSON(),
                tags: tagIDs
                    .map((id) => tagPools.find((tag) => tag.id === id))
                    .filter((tag): tag is Tag => tag !== undefined)
                    .map((tag) => tag.toJSON()),
            }
        },

        userByID: async (_, args: UserByIdQueryOptions, context) => {
            const item = await context.dataSources.sql.userByID(args)
            return item?.toJSON() ?? null
        },
        tags: async (_, args: TagsQueryOptions, context) => {
            const items = await context.dataSources.sql.getTags(args)
            return items.map((item) => item.toJSON())
        },
    },
    // Mutation: {},
}
