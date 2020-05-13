import { Sequelize, DataTypes, Model } from 'sequelize'

export class Post extends Model {
    id!: number
    slug!: string
    // authorID!: number
    title!: string
    date!: string
    body!: string
    banner?: string
    draft!: boolean
}

export class Tag extends Model {
    id!: number
    name!: string
}

export class PostTags extends Model {
    postId!: number
    tagId!: number
}
export class User extends Model {
    id!: number
    name!: string
    email!: string
    avatar?: string
    role!: Role
}

export type Role = 'ADMIN' | 'AUTHOR' | 'USER'

export const createDB = async (filename: string = './store.sqlite') => {
    const db = new Sequelize({
        dialect: 'sqlite',
        storage: filename,
        // logging: false
    })
    configPost(db)
    configTag(db)
    configUser(db)
    configPostTags(db)
    User.hasMany(Post)
    Post.belongsTo(User, {
        foreignKey: {
            name: 'authorID',
            allowNull: false,
        },
        as: 'author',
    })

    Post.belongsToMany(Tag, { through: PostTags })
    Tag.belongsToMany(Post, { through: PostTags })

    await db.sync({ force: true })
    return db
}

function configPost(db: Sequelize, modelName: string = 'post') {
    Post.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // authorID: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            // },
            title: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            body: DataTypes.TEXT,
            banner: DataTypes.STRING,
            draft: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        { sequelize: db, modelName }
    )
}

function configTag(db: Sequelize, modelName: string = 'tag') {
    Tag.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        { sequelize: db, modelName }
    )
}

function configPostTags(db: Sequelize, modelName: string = 'postTags') {
    PostTags.init(
        {
            // postId: {
            //     type: DataTypes.INTEGER,
            //     references: {
            //         model: Post,
            //         key: 'id',
            //     },
            // },
            // TagId: {
            //     type: DataTypes.INTEGER,
            //     references: {
            //         model: Tag,
            //         key: 'id',
            //     },
            // },
        },
        { sequelize: db, modelName }
    )
}

function configUser(db: Sequelize, modelName: string = 'user') {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            avatar: DataTypes.STRING,
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'ADMIN',
            },
        },
        { sequelize: db, modelName }
    )
}
