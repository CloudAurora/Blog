import { ApolloServer } from 'apollo-server-micro'
// import { schema } from './schema'
// import { directives } from './extension'
import { ServerContext } from 'types'
// import { createDB } from 'db/createStore'
// import { SqlDataSource } from './datasource'
// import { Sequelize } from 'sequelize/types'
import "reflect-metadata";
import { getSchema } from './schema';
import { ServerRegistration } from 'apollo-server-micro/dist/ApolloServer';


export const startServer = async (params?:ServerRegistration) => {
    const apolloServer = new ApolloServer({
        schema: await getSchema(),
        async context(ctx: ServerContext) {
            return ctx;
        },
    });
    return apolloServer.createHandler(params);
}