import { UserInputError, IResolvers } from 'apollo-server-micro'
import {
    SqlDataSource,
    PostsQueryOptions,
    PostQueryOptions,
    UserByIdQueryOptions,
    TagsQueryOptions,
} from './datasource'


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
                    'draft',
                ],
            })
            return {
                total: ret.total,
                items: ret.items.map((item) => item.toJSON()),
            }
        },
        post: async (_, args: PostQueryOptions, context) => {
            const item = await context.dataSources.sql.getPost(args)
            return item?.toJSON() ?? null
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
