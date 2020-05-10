import { ApolloServer } from 'apollo-server-micro'
import { schema } from './schema'
import { directives } from './extension';


export const apolloServer = new ApolloServer({
    schema,
    context(ctx) {
        return ctx
    },
    schemaDirectives: directives
});


