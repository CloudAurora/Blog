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

const Category = objectType({
    name: 'Category',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.slug()
        t.model.posts()
        t.field('postCount', {
            type: 'Int',
            nullable: false,
            resolve(root, {}, context) {
                return context.prisma.post.count({
                    where: { categories: { some: { id: root.id } } },
                })
            },
        })
    },
})

const Tag = objectType({
    name: 'Tag',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.slug()
        t.model.posts()
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
        t.model.categories()
        t.model.tags()
    },
})

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.crud.post()
        t.crud.user()
        t.crud.tag()
        t.crud.category()
        t.crud.tags()
        t.crud.categories()
        t.crud.posts({
            filtering: true,
            // filtering: { authorId: true, title: true, content: true, OR: true },
            ordering: { updatedAt: true },
        })
    },
})

// use __dirname to detect the nextjs env.
const isNextRuntime = __dirname === '/'

export const schema = makeSchema({
    types: [Query, Category, Tag, Post, User],
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
