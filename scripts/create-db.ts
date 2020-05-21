import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import * as matter from 'gray-matter'
import { PrismaClient, PostCreateInput } from '@prisma/client'
import { kebabCase, capitalize } from 'lodash'

const prisma = new PrismaClient()
const readdir = promisify(fs.readdir)

const dir = __dirname + '/../posts'

async function main(dir: string) {
    let hasFailed = false;
    try {
        const files = await readdir(dir, { encoding: 'utf8' })
        await Promise.all(
            files.map(async (file) => {
                try {
                    const info = await readInfo(dir, file)
                    if (!info) return
                    await storePost(info)
                    console.log(`update post: ${info.meta.title}`)
                } catch (err) {
                    console.log(`failed to update post: ${file}`)
                    hasFailed = true;
                    console.error(err);
                }
            })
        )
    } finally {
        prisma.disconnect()
        if (hasFailed) {
            process.exit(1);
        }
    }
}

interface Info {
    meta: Meta
    content: string
    excerpt?: string
}

interface Meta {
    slug: string
    title: string
    author: string
    createdAt: Date
    draft: boolean
    updatedAt: Date
    tags: string[]
    categories: string[]
    source: string
}

async function readInfo(dir: string, filename: string) {
    const fullPath = path.join(dir, filename)
    const stat = fs.statSync(fullPath)
    if (stat.isFile() && path.extname(filename) === '.md') {
        const info = await matter.read(fullPath, {
            excerpt: true,
            excerpt_separator: '<!--more-->',
        })
        const meta: Meta = {
            slug: info.data.slug || kebabCase(filename),
            title: info.data.title || capitalize(filename),
            author: 'admin',
            createdAt: new Date(info.data.date || stat.mtime),
            updatedAt: stat.mtime,
            draft: false,
            tags: info.data.tags || [],
            categories: info.data.categories || [],
            source: filename,
        }
        info.data.date = new Date(info.data.date || stat.mtime)

        return { meta, content: info.content, excerpt: info.excerpt }
    }
}

async function storePost({ excerpt, content, meta }: Info) {
    const author = await prisma.user.upsert({
        where: {
            name: meta.author,
        },
        create: {
            email: 'unknown@unknown.com',
            name: meta.author,
        },
        update: {},
    })

    const postArgs: PostCreateInput = {
        content,
        author: {
            connect: { id: author.id },
        },
        excerpt,
        createdAt: meta.createdAt,
        updatedAt: meta.updatedAt,
        draft: meta.draft,
        title: meta.title,
        slug: meta.slug,
        source: meta.source,
    }

    const post = await prisma.post.upsert({
        where: { title: meta.title },
        create: postArgs,
        update: postArgs,
    })
    return [post, author] as const
}

main(dir)
