import { DataSource } from 'apollo-datasource'
import { Post, Tag, User, PostTags } from 'db/createStore'
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

    private async getPostIDsByTagID(tagID: string | number): Promise<number[]> {
        return PostTags.findAll({
            where: { tagID } as any,
            attributes: ['postID'],
        }).map((p: PostTags) => p.postId)
    }

    private async getTagIDsbyPostID(
        postID: string | number
    ): Promise<number[]> {
        return PostTags.findAll({
            where: { postID },
            attributes: ['tagID'],
        }).map((p: PostTags) => p.tagId)
    }

    async getPosts(
        options: PostsQueryOptions
    ): Promise<{ total: number; items: Post[] }> {
        const wheres: Record<string, any>[] = []
        if (options.tagID) {
            const postIDs = await this.getPostIDsByTagID(options.tagID)
            wheres.push({ id: postIDs })
        }

        if (options.authorID) {
            wheres.push({ authorID: options.authorID })
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
            include: ['author', Tag],
        })
        return { total: count, items: rows }
    }

    getPost(options: PostQueryOptions): Promise<Post | undefined> {
        return Post.findOne({
            where: { id: options.id },
            include: ['author', Tag],
        })
    }

    getTag(options: TagQueryOptions): Promise<Tag | undefined> {
        return Tag.findOne({ where: { id: options.id } })
    }

    async getTags(options: TagsQueryOptions): Promise<Tag[]> {
        if (options.postID) {
            const tagIDs = await this.getTagIDsbyPostID(options.postID)
            return Tag.findAll({ where: { id: tagIDs } })
        }
        return Tag.findAll()
    }

    async userByID(options: UserByIdQueryOptions): Promise<User> {
        return User.findOne({ where: { id: options.id } })
    }
}
