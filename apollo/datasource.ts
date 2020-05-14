import { DataSource } from 'apollo-datasource'
import { Post, Tag, User } from 'db/createStore'
import { Op } from 'sequelize'
import { ServerContext, CommonListOptions } from 'types'

export interface PostsQueryOptions extends CommonListOptions {
    authorID?: string | number
    tagID?: string | number
    keyword?: string
    attributes?: string[]
}

export interface PostQueryOptions {
    id: string | number
}

export interface TagsQueryOptions {
    postID?: string | number
}

export interface TagQueryOptions {
    id: string | number
}

export interface UserByIdQueryOptions {
    id: string | number
}

export class SqlDataSource extends DataSource {
    private context!: ServerContext

    initialize(config: any) {
        this.context = config.context
    }

    async getPosts(
        options: PostsQueryOptions
    ): Promise<{ total: number; items: Post[] }> {
        const wheres: Record<string, any>[] = []
        if (options.tagID !== undefined) {
            wheres.push({
                [Op.or]: [
                    { tags: { [Op.like]: `%,${options.tagID},%` } },
                    { tags: { [Op.like]: `%,${options.tagID}` } },
                    { tags: { [Op.like]: `${options.tagID},%` } },
                ],
            })
        }

        if (options.authorID) {
            wheres.push({ authorID: +options.authorID })
        }

        if (options.keyword) {
            wheres.push({
                [Op.or]: [
                    { title: { [Op.substring]: options.keyword } },
                    { body: { [Op.substring]: options.keyword } },
                ],
            })
        }
        const where = { [Op.and]: wheres }
        const { count, rows } = await Post.findAndCountAll({
            limit: options.limit || 20,
            offset: options.offset || 0,
            order: [['date', 'DESC']],
            attributes: options.attributes,
            where,
            include: ['author'],
        })
        return { total: count, items: rows }
    }

    getPost(options: PostQueryOptions): Promise<Post | null> {
        return Post.findOne({
            where: { id: +options.id },
            include: ['author'],
        })
    }

    getTag(options: TagQueryOptions): Promise<Tag | null> {
        return Tag.findOne({ where: { id: +options.id } })
    }

    async getTags(options: TagsQueryOptions): Promise<Tag[]> {
        if (options.postID !== undefined) {
            return Tag.findAll({
                where: {
                    [Op.or]: [
                        { posts: { [Op.like]: `%,${options.postID},%` } },
                        { posts: { [Op.like]: `%,${options.postID}` } },
                        { posts: { [Op.like]: `${options.postID},%` } },
                    ],
                },
            })
        }
        return Tag.findAll()
    }

    async userByID(options: UserByIdQueryOptions): Promise<User | null> {
        return User.findOne({ where: { id: +options.id } })
    }
}
