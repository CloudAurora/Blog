import { Sequelize, DataTypes, Model } from 'sequelize'

export class Post extends Model {
    id!: number
    slug!: string
    // authorID!: number
    title!: string
    tags?: string
    date!: string
    body!: string
    banner?: string
    draft!: boolean

    getTagIDs(): number[] {
        return (
            this.tags
                ?.split(',')
                .filter((i) => !!i)
                .map((i) => +i) ?? []
        )
    }
}

export class Tag extends Model {
    id!: number
    name!: string
    posts?: string

    getPostIDs(): number[] {
        return (
            this.posts
                ?.split(',')
                .filter((i) => !!i)
                .map((i) => +i) ?? []
        )
    }
}

// export class PostTags extends Model {
//     postId!: number
//     tagId!: number
// }
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
    // configPostTags(db)
    User.hasMany(Post, { foreignKey: { name: 'authorID', defaultValue: 1 } })
    Post.belongsTo(User, {
        foreignKey: { name: 'authorID', defaultValue: 1 },
        as: 'author',
    })

    await db.sync({ alter: true })
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
            tags: {
                type: DataTypes.TEXT,
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
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
            },
            posts: {
                type: DataTypes.TEXT,
            },
        },
        { sequelize: db, modelName }
    )
}

// function configPostTags(db: Sequelize, modelName: string = 'postTags') {
//     PostTags.init(
//         {
//             PostID: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 primaryKey: true,
//             },
//             TagID: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 primaryKey: true
//             },
//         },
//         { sequelize: db, modelName }
//     )
// }

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
