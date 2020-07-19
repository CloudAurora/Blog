import { ApolloServer } from 'apollo-server-micro'
import { createContext } from './context'
import { schema } from './schema'
import { ServerRegistration } from 'apollo-server-micro/dist/ApolloServer'

export const startServer = async (params?: ServerRegistration) => {
    const apolloServer = new ApolloServer({
        schema,
        context(ctx) {
            return createContext(ctx)
        },
    })
    return apolloServer.createHandler(params)
}
