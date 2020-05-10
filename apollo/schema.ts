import { makeExecutableSchema } from 'graphql-tools'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'
import { scalars, PRE_DEFS } from './extension'
import gql from 'graphql-tag'
// import gql from 'graphql-tag'

export const schema = makeExecutableSchema({
  typeDefs: gql`${PRE_DEFS}\n${typeDefs}`,
  resolvers: { ...scalars, ...resolvers },
})
