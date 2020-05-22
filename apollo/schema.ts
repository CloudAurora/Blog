import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema, objectType } from '@nexus/schema'
import tempy from 'tempy'

const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.email()
        t.model.name()
        t.model.posts({
            pagination: false,
        })
        t.field('postCount', {
            type: 'Int',
            nullable: false,
            resolve: (root, {}, context) => {
                return context.prisma.post.count({
                    where: { authorId: root.id },
                })
            },
        })
    },
})

const Post = objectType({
    name: 'Post',
    definition(t) {
        t.model.id()
        t.model.title()
        t.model.content()
        t.model.slug()
        t.model.excerpt()
        t.model.draft()
        t.model.author()
        t.model.updatedAt()
        t.model.createdAt()
    },
})

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.crud.post()
        t.crud.user()
        t.crud.posts({
            filtering: { authorId: true, title: true, content: true },
            ordering: { updatedAt: true },
        })
    },
})

// use __dirname to detect the nextjs env.
const isNextRuntime = __dirname === '/'

export const schema = makeSchema({
    types: [Query, Post, User],
    plugins: [nexusPrismaPlugin()],
    outputs: {
        typegen: isNextRuntime ? false : __dirname + '/../generated/nexus.d.ts',
        schema: isNextRuntime
            ? tempy.directory() + '/schema.graphql'
            : __dirname + '/../generated/schema.graphql',
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'prisma',
            },
            {
                source: require.resolve('./context'),
                alias: 'Context',
            },
        ],
    },
})
