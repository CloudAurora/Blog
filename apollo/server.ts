import { ApolloServer } from 'apollo-server-micro'
import { ServerContext } from 'types'
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