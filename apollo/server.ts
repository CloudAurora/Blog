import { ApolloServer } from 'apollo-server-micro'
import { schema } from './schema'
import { directives } from './extension'
import { ServerContext } from 'types'
import { createDB } from 'db/createStore'
import { SqlDataSource } from './datasource'
import { Sequelize } from 'sequelize/types'

let globalDB: Sequelize | undefined = undefined
export const apolloServer = new ApolloServer({
    schema,
    async context(ctx: ServerContext) {
        if (globalDB === undefined) {
            globalDB = await createDB()
            console.log('refresh')
        }
        return { ...ctx, db: globalDB }
    },
    schemaDirectives: directives,
    dataSources: () => ({
        sql: new SqlDataSource(),
    }),
})
